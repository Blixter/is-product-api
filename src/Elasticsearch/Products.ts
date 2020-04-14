import * as dotenv from "dotenv";
import { Client } from "@elastic/elasticsearch";
import esb, { matchQuery } from "elastic-builder";

dotenv.config();

const url = process.env.ES_URL;

const client = new Client({ node: url });

// Elasticsearch searcher
async function searcher(bodyQuery: { toJSON: () => any }) {
  const { body } = await client.search({
    index: "productinfo-prod",
    body: bodyQuery.toJSON()
  });

  return body;
}

export async function fetchProducts(
  from: number,
  size: number,
  queryString: string
) {
  const requestBody = esb
    .requestBodySearch()
    .query(
      esb
        .boolQuery()
        .must([
          esb.termQuery("documenttype", "article"),
          esb.matchQuery("sites", "Intersport.se"),
          esb.termQuery("valid", "true"),
          esb.termQuery("articlenotsearchable", "false"),
          esb.termQuery("hidearticleweb", "false")
        ])
        .should([
          esb.queryStringQuery(`${queryString}`),
          esb
            .hasChildQuery()
            .query(esb.matchAllQuery())
            .type("price")
            .innerHits(
              esb
                .innerHits()
                .source(["price", "pricetype", "regularprice"])
                .sort(esb.sort("price.numeric"))
            ),
          esb
            .hasChildQuery()
            .query(esb.matchAllQuery())
            .type("sku")
            .innerHits(
              esb
                .innerHits("sizes")
                .size(200)
                .source([
                  "itemnumber",
                  "itemskusizename",
                  "itemskuean",
                  "itemskunumber",
                  "itemskusizeid",
                  "itemskusizename_urlslug"
                ])
                .sort(esb.sort("itemskusizesort.keyword", "asc"))
            ),
          esb
            .nestedQuery()
            .path("media")
            .query(
              esb
                .boolQuery()
                .should([
                  esb.termQuery("media.sites", "Intersport.se"),
                  esb.boolQuery().mustNot([esb.existsQuery("media.sites")])
                ])
            )
        ])
        .mustNot([
          esb
            .boolQuery()
            .must([
              esb.termQuery("onearticlelistingspresent", "false"),
              esb.termQuery("onearticlelistings", "true")
            ])
        ])
    )
    .from(from)
    .size(size)
    .source({
      excludes: [
        "spell",
        "_allfielddiffs",
        "_allfieldnames",
        "querycompletion*",
        "sort_*",
        "spell"
      ]
    });

  const body = await searcher(requestBody);

  return body.hits.hits;
}

export async function fetchProductById(id: string) {
  const requestBody = esb
    .requestBodySearch()
    .query(
      esb
        .boolQuery()
        .must([
          esb.termQuery("documenttype", "article"),
          esb.matchQuery("sites", "Intersport.se"),
          esb.matchQuery("_id", `${id}`),
          esb.termQuery("valid", "true"),
          esb.termQuery("articlenotsearchable", "false"),
          esb.termQuery("hidearticleweb", "false")
        ])
        .should([
          esb
            .hasChildQuery()
            .query(esb.matchAllQuery())
            .type("price")
            .innerHits(
              esb
                .innerHits()
                .source([
                  "price",
                  "pricetype",
                  "regularprice",
                  "campaigndescription",
                  "campaignid",
                  "campaigntag",
                  "salescontroldescription",
                  "salescontroltype"
                ])
                .sort(esb.sort("price.numeric"))
            ),
          esb
            .hasChildQuery()
            .query(esb.matchAllQuery())
            .type("sku")
            .innerHits(
              esb
                .innerHits("sizes")
                .size(200)
                .source([
                  "itemnumber",
                  "itemskusizename",
                  "itemskuean",
                  "itemskunumber",
                  "itemskusizeid",
                  "itemskusizename_urlslug"
                ])
                .sort(esb.sort("itemskusizesort.keyword", "asc"))
            ),
          esb
            .nestedQuery()
            .path("media")
            .query(
              esb
                .boolQuery()
                .should([
                  esb.termQuery("media.sites", "Intersport.se"),
                  esb.boolQuery().mustNot([esb.existsQuery("media.sites")])
                ])
            )
        ])
        .mustNot([
          esb
            .boolQuery()
            .must([
              esb.termQuery("onearticlelistingspresent", "false"),
              esb.termQuery("onearticlelistings", "true")
            ])
        ])
    )
    .source({
      excludes: [
        "spell",
        "_allfielddiffs",
        "_allfieldnames",
        "querycompletion*",
        "sort_*",
        "spell"
      ]
    });

  const body = await searcher(requestBody);

  return body.hits.hits;
}

export async function fetchSaldoByItemNumber(
  itemnumber: string,
  store: string
) {
  // Fetch saldo by itemnumber
  const requestBody = esb.requestBodySearch().query(
    esb
      .hasChildQuery()
      .type("saldo")
      .query(
        esb
          .boolQuery()
          .must([
            matchQuery("store", `${store}`),
            matchQuery("_routing", `${itemnumber}`)
          ])
      )
      .innerHits(
        esb
          .innerHits("saldo")
          .size(200)
          .source(["quantityAvailable", "store", "instock"])
          .sort(esb.sort("store.keyword", "asc"))
      )
  );
  const body = await searcher(requestBody);

  return body.hits.hits;
}

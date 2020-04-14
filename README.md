# Intersport GraphQL-API

This project is a GraphQL-API that fetches the data from Elasticsearch.

## Install the dependencies

Run the following command to install the needed dependencies:

```
npm install
```

## Create needed .env-file

**Important:** Manually create a new file `.env` in the root of the project.

Copy the content below to the file:

```
ES_URL=URL_GOES_HERE
PORT=GRAPHQL_PORT_GOES_HERE
```

Replace `URL_GOES_HERE` with the url to the Elasticsearch server.
Replace `GRAPHQL_PORT_GOES_HERE` with the wanted port number for the GraphQL-server.

## Start the server

Run the following command to start the server

```
npm start
```

The following message will be shown in the console if the server successfully started:

```
server started at http://localhost:PORT/graphql
```

When the server is running, you can access the GraphQL Playground by entering the url shown in the console.

## Example

An example on how to run a GraphQL query to fetch a product with a specific id number. Fetching only the fields wanted.

```js
{
  product(id: "145451002") {
    _indextime
    article_urlslug
    articlenotsearchable
    brands {
      brandimage
      brandimageurl
      brand_urlslug
      brand
    }
    campaign {
      campaigndescription
    }
    categories
    color {
      ColorCode
      ColorName
    }
    colordescription
    colordescription_urlslug
    commercialname
    commercialname_urlslug
    deliverytime
    description
    disableclickandcollect
    documenttype
    googlecategory
    hidearticleweb
    hidetargetaudience
    intersportexclusive
    itemname
    itemnumber
    itemcategory: itemcategoryintersport
    itemtype: itemtypeintersport
    itempublishtoweb
    itempublishtoweb_lastmodified
    itemimages
    itemimages_png
    itemurl
    maingroup
    media
    popularity
    price {
      price
      pricetype
      regularprice
    }
    productname
    productname_urlslug
    productsizerange
    producttype
    saleable
    salable: saleable
    saleabletext
    salabletext: saleabletext
    season
    shortdescription
    sites
    sizes {
      itemskuean
      itemskunumber
      itemskusizeid
      itemskusizename
      itemskusizename_urlslug
      saldo {
        quantityAvailable
        store
      }
    }
    sportTaxonomy
    sports
    sports_urlslug
    supplieritemnumber
    targetGroupTaxonomy
    targetaudience
    usp
    valid
  }
}
```

## How it works

The resolver function which fetches the data uses [Elasticsearch Node.JS client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html).

Below is the searcher function which takes the elasticsearch query and sends it to the server, and returns the result:

```js
async function searcher(bodyQuery: { toJSON: () => any }) {
  const { body } = await client.search({
    index: "productinfo-prod",
    body: bodyQuery.toJSON()
  });

  return body;
}
```

To build up the queries an external libray is being used which is called: [elastic-builder](https://www.npmjs.com/package/elastic-builder). Below is the query to fetch a product by Id:

```js
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
```

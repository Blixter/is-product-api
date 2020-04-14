import { Query, Resolver, Arg } from "type-graphql";
import { Document } from "../object-types/Document";
import {
  fetchProductById,
  fetchSaldoByItemNumber
} from "../Elasticsearch/Products";
import { IPrice, ISize, IReturnedSizes } from "src/interfaces/product";

@Resolver()
export class ProductResolver {
  @Query(() => Document)
  async product(
    @Arg("id") id: string,
    @Arg("store", { defaultValue: 266 }) store: string
  ) {
    const result = await fetchProductById(id);
    const sizesAndsaldo: [ISize] = await fetchSaldoByItemNumber(id, store);

    if (result[0]) {
      console.log("Fetched data from index:", result[0]._index);
      const price: IPrice = result[0].inner_hits.price.hits.hits[0]._source;

      const sizes = sizesAndsaldo.map((element: ISize) => {
        let returnedSizes: IReturnedSizes;

        returnedSizes = element._source;
        returnedSizes.saldo = element.inner_hits.saldo.hits.hits[0]._source;

        return returnedSizes;
      });

      // Adding sizes and price to the returning JSON document
      result[0]._source.sizes = sizes;

      const campaign = (({ campaigndescription, campaignid, campaigntag }) => ({
        campaigndescription,
        campaignid,
        campaigntag
      }))(price);

      const salescontrol = (({
        salescontroldescription,
        salescontroltype
      }) => ({
        salescontroldescription,
        salescontroltype
      }))(price);

      result[0]._source.price = price;
      result[0]._source.campaign = campaign;
      result[0]._source.salescontrol = salescontrol;

      // Mock colour
      const colours = {
        id: "colours",
        displayName: "Colours",
        numberOfHits: 0,
        documents: [],
        pagination: {
          offset: 0,
          hitsPerPage: 50,
          firstPage: null,
          previousPage: null,
          nextPage: null,
          lastpage: null,
          pages: []
        }
      };

      // Mock sort options
      const sortOptions = [
        {
          displayName: "Default sort",
          selected: true,
          query: `id=${id}&sort=default`
        }
      ];

      result[0]._source.colours = colours;
      result[0]._source.sortOptions = sortOptions;
      return result[0]._source;
    } else {
      console.log("No item found");
      return [];
    }
  }
}

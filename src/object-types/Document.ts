import { ObjectType, Field } from "type-graphql";
import { Brands } from "./Brands";
import { Color } from "./Color";
import { GraphQLJSON } from "graphql-type-json";
import { Size } from "./Size";
import { Price } from "./Price";
import { Colors } from "./Colors";
import { Salescontrol } from "./Salescontrol";
import { Campaign } from "./Campaign";

@ObjectType()
export class Document {
  @Field()
  _indextime: string;
  @Field(() => GraphQLJSON)
  article_urlslug: any;
  @Field()
  articlenotsearchable: string;
  @Field()
  brand: string;
  @Field()
  brandTaxonomy: string;
  @Field()
  brand_urlslug: string;
  @Field()
  brandimage: string;
  @Field()
  brandimageurl: string;
  @Field(() => [Brands])
  brands: [Brands];
  @Field(() => Price)
  price: Price;
  @Field(() => Campaign)
  campaign: Campaign;
  @Field(() => [String])
  categories: [string];
  @Field(() => [Color])
  color: [Color];
  @Field(() => [Colors])
  colors: Colors;
  @Field()
  colordescription: string;
  @Field()
  colordescription_urlslug: string;
  @Field()
  commercialname: string;
  @Field()
  commercialname_urlslug: string;
  @Field()
  deliverytime: string;
  @Field()
  description: string;
  @Field()
  saleable: string;
  @Field()
  saleabletext: string;
  @Field(() => Salescontrol)
  salescontrol: Salescontrol;
  @Field()
  season: string;
  @Field()
  shortdescription: string;
  @Field(() => GraphQLJSON)
  sites: any;
  @Field(() => [Size])
  sizes: [Size];
  @Field(() => GraphQLJSON)
  sportTaxonomy: any;
  @Field(() => [String])
  sports: [string];
  @Field({ nullable: true })
  sports_urlslug: string;
  @Field()
  supplieritemnumber: string;
  @Field(() => GraphQLJSON)
  targetGroupTaxonomy: any;
  @Field(() => [String])
  targetaudience: [string];
  @Field(() => [String])
  usp: [string];
  @Field()
  valid: string;
  @Field(() => GraphQLJSON)
  media: any;
  @Field()
  disableclickandcollect: string;
  @Field()
  maingroup: string;
  @Field()
  googlecategory: string;
  @Field()
  itemname: string;
  @Field()
  itemnumber: string;
  @Field()
  itemurl: string;
  @Field()
  itemproducttype: string;
  @Field()
  itempublishtoweb: string;
  @Field()
  itempublishtoweb_lastmodified: string;
  @Field(() => [String])
  itemimages: [string];
  @Field(() => [String])
  itemimages_png: [string];
  @Field(() => [String])
  itemcategoryintersport: [string];
  @Field(() => [String])
  itemtypeintersport: [string];
  @Field()
  onearticleinlistings: string;
  @Field()
  productname: string;
  @Field()
  productname_urlslug: string;
  @Field()
  producttype: string;
  @Field()
  onearticleinlistingspresent: string;
  @Field(() => GraphQLJSON)
  productsizerange: any;
  @Field()
  hidearticleweb: string;
  @Field()
  hidetargetaudience: string;
  @Field()
  intersportexclusive: string;
  @Field()
  popularity: string;
  @Field()
  documenttype: string;
  @Field(() => GraphQLJSON)
  colours: any;
  @Field(() => GraphQLJSON)
  sortOptions: any;
}

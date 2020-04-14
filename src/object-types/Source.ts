import { ObjectType, Field } from "type-graphql";
import { GraphQLJSON } from "graphql-type-json";

@ObjectType()
export class Source {
  @Field()
  itemnumber: string;
  @Field()
  itemskusizeid: string;
  @Field(() => GraphQLJSON, { nullable: true })
  filtervalue: string;
  @Field({ nullable: true })
  itemskuzisename_urlslug: string;
  @Field(() => GraphQLJSON, { nullable: true })
  documenttype: string;
  @Field()
  _indextime: string;
  @Field()
  filterkey: string;
  @Field(() => GraphQLJSON, { nullable: true })
  presentation: string;
  @Field()
  itemskusizename: string;
  @Field()
  skuitemurl: string;
  @Field()
  itemskuean: string;
}

import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Price {
  @Field()
  price: string;
  @Field()
  pricetype: string;
  @Field()
  regularprice: string;
}

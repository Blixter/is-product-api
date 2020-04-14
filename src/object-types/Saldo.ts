import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Saldo {
  @Field()
  quantityAvailable: string;
  @Field()
  store: string;
}

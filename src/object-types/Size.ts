import { ObjectType, Field } from "type-graphql";
import { Saldo } from "./Saldo";

@ObjectType()
export class Size {
  @Field()
  itemnumber: string;
  @Field()
  itemskusizeid: string;
  @Field()
  itemskusizename: string;
  @Field()
  itemskusizename_urlslug: string;
  @Field()
  itemskunumber: string;
  @Field()
  itemskuean: string;
  @Field(() => Saldo)
  saldo: Saldo;
}

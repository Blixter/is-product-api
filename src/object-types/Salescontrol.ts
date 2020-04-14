import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Salescontrol {
  @Field()
  salescontroldescription: string;
  @Field()
  salescontroltype: string;
}

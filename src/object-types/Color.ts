import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Color {
  @Field() 
  ColorCode: string
  @Field()
  ColorName: string
}

import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Colors {
  @Field()
  itemimage: string;
  @Field()
  colordescription: string;
  @Field()
  colordescription_urlslug: string;
  @Field()
  name: string;
  @Field()
  hex: string;
  @Field()
  name_urlslug: string;
}

import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Brands {
  @Field()
  brandimage: string;
  @Field()
  brandimageurl: string;
  @Field()
  brand_urlslug: string;
  @Field()
  brand: string;
}

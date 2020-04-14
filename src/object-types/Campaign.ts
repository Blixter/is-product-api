import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Campaign {
  @Field()
  campaigndescription: string;
  @Field()
  campaignid: string;
  @Field()
  campaigntag: string;
}

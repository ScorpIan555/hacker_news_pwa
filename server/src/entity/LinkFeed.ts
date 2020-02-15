import { Field } from "type-graphql";
import { Link } from ".";
import { BaseEntity } from "typeorm";

export class LinkFeed extends BaseEntity {
  @Field(() => [Object])
  feed: [Link];
}

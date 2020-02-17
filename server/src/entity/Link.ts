import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
  //   Timestamp
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
// import { User } from "./User";

// https://blog.logrocket.com/how-build-graphql-api-typegraphql-typeorm/

@ObjectType()
@Entity("links")
export class Link extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  url: string;

  @Field()
  @Column("text")
  description: string;

  @Field()
  @Column("text")
  postedBy: string;

  //   @Field(() => Timestamp, { nullable: false })
  //   @Column("timestamp", { nullable: false })
  //   createdAt: Date;

  //   @Field(() => Timestamp)
  //   @Column("timestamp", { nullable: false })
  //   updatedAt: Date;

  // @Column("int", { default: 0 })
  // tokenVersion: number;
}

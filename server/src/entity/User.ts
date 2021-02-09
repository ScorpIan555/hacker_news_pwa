import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Link } from '.';

// interface ArrayOfUsers {
//  https://typegraphql.com/
// }

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  email: string;

  @Column('text')
  password: string;

  // @Field(() => String)
  // @Column('text', { default: [] })
  // linksUserHasVotedFor: string;

  @Field(() => [Int])
  // https://stackoverflow.com/questions/57611633/typeorm-array-is-not-supported-in-postgres
  @Column('int', { array: true, default: {} })
  linksArray: number[];

  @Column('int', { default: 0 })
  tokenVersion: number;
}

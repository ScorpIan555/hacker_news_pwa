import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

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

  @Field(() => [User])
  @Column('text', { default: [] })
  links_voted_for: string[];

  @Column('int', { default: 0 })
  tokenVersion: number;
}

import { TeamInput } from '@root/input/TeamInput';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './Team';

@Entity()
@ObjectType()
export class Tournament extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => Date)
  @Column()
  date!: Date;

  @Field(() => [Team])
  @ManyToMany((type) => Team, (team) => team.tournaments)
  @JoinTable()
  teams!: Team[];
}

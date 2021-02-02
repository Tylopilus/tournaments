import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Matches } from './Matches';
import { Team } from './Team';

@Entity()
@ObjectType()
export class Groups extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [Team])
  @OneToMany(() => Team, (teams) => teams.advancedInGroup)
  advancingTeams!: Team[];

  @Field(() => [Matches])
  @ManyToOne(() => Matches, (matches) => matches.group)
  matches!: Matches[];
}

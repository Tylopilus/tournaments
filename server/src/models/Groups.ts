import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupStage } from './GroupStage';
import { Matches } from './Matches';
import { Team } from './Team';
import { Tournament } from './Tournament';

@Entity()
@ObjectType()
export class Groups extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [Team], { defaultValue: [] })
  @OneToMany(() => Team, (team) => team.group)
  teams!: Team[];

  @Field(() => [Team], { nullable: true })
  @OneToMany(() => Team, (teams) => teams.advancedInGroup)
  advancingTeams!: Team[];

  @Field(() => [Matches], { nullable: true })
  @ManyToOne(() => Matches, (matches) => matches.group)
  matches!: Matches[];

  @Field(() => GroupStage)
  @OneToMany(() => GroupStage, (groupStage) => groupStage.groups)
  groupStage!: GroupStage;

  @ManyToOne(() => Tournament, (tournament) => tournament.groups)
  tournament!: Tournament;
}

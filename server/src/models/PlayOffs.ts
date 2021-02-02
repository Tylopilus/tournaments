import { Status } from '@root/Enums/Status';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Matches } from './Matches';
import { Team } from './Team';
import { Tournament } from './Tournament';

@Entity()
@ObjectType()
export class PlayOffs extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Tournament)
  @OneToOne(() => Tournament, (tournament) => tournament.playOff)
  tournament!: PlayOffs;

  @Field(() => Status)
  @Column()
  status!: Status;

  @Field(() => Team)
  @OneToMany(() => Team, (team) => team.playOffsWinner)
  winner!: Team;

  @Field(() => [Matches])
  @ManyToOne(() => Matches, (matches) => matches.playOff)
  matches!: Matches[];
}

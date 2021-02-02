import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Groups } from './Groups';
import { Matches } from './Matches';
import { PlayOffs } from './PlayOffs';
import { Tournament } from './Tournament';

@Entity()
@ObjectType()
export class Team extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  player1!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  player2!: string;

  @Field(() => Int)
  @Column({ default: 0 })
  wins!: number;

  @Field(() => [Tournament], { defaultValue: [] })
  @ManyToMany(() => Tournament, (tournament) => tournament.teams)
  tournaments!: Tournament[];

  @Field(() => [PlayOffs], { nullable: true })
  @ManyToOne(() => PlayOffs, (playOffs) => playOffs.winner)
  playOffsWinner!: [PlayOffs];

  @Field(() => Groups, { nullable: true })
  @ManyToOne(() => Groups, (group) => group.advancingTeams)
  advancedInGroup!: Groups;

  @Field(() => [Matches], { nullable: true })
  @ManyToMany(() => Matches, (matches) => matches.teams)
  matches!: Matches[];

  @Field(() => [Matches], { nullable: true })
  @ManyToOne(() => Matches, (matches) => matches.winner)
  wonMatches!: Matches[];
}

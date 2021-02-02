import { Status } from '@root/Enums/Status';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Groups } from './Groups';
import { PlayOffs } from './PlayOffs';
import { Team } from './Team';

@Entity()
@ObjectType()
export class Matches extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Date)
  @Column()
  scheduledAt!: Date;

  @Field(() => Int)
  @Column()
  score1!: number;

  @Field(() => Int)
  @Column()
  score2!: number;

  @Field(() => Status)
  @Column()
  status!: Status;

  @Field(() => [Team])
  @ManyToMany(() => Team, (team) => team.matches)
  @JoinTable()
  teams!: Team[];

  @Field(() => Team)
  @OneToMany(() => Team, (team) => team.wonMatches)
  winner!: Team;

  @Field(() => Groups)
  @OneToMany(() => Groups, (groups) => groups.matches)
  group!: Groups;

  @Field(() => PlayOffs)
  @OneToMany(() => PlayOffs, (playOff) => playOff.matches)
  playOff!: PlayOffs;
}

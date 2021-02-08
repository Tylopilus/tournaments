import { Status } from '@root/Enums/Status';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupStage } from './GroupStage';
import { PlayOffs } from './PlayOffs';
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

  @Field(() => Int)
  @Column({ default: 64 })
  maxTeams!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  currentTeams!: number;

  @Field(() => Status)
  @Column({ default: Status.scheduled })
  status!: Status;

  @Field(() => Team, { nullable: true })
  @ManyToOne(() => Team, (team) => team.id)
  winner!: Team;

  @Field(() => [Team])
  @ManyToMany((type) => Team, (team) => team.tournaments)
  @JoinTable()
  teams!: Team[];

  @Field(() => GroupStage)
  @OneToOne(() => GroupStage, (groupStage) => groupStage.tournament)
  @JoinColumn()
  groupStages!: GroupStage;

  @Field(() => PlayOffs)
  @OneToOne(() => PlayOffs, (playOffs) => playOffs.tournament)
  @JoinColumn()
  playOff!: PlayOffs;
}

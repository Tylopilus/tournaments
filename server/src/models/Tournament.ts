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
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Groups } from './Groups';
import { GroupStage } from './GroupStage';
import { PlayOffs } from './PlayOffs';
import { Team } from './Team';

@Entity()
@ObjectType()
export class Tournament extends BaseEntity {
  @Field(() => Int)
  @Column({ default: 2 })
  advancePerGroup!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  currentTeams!: number;

  @Field(() => Int)
  hasManyTeams(): number {
    return 2;
  }

  @Field(() => Date)
  @Column()
  date!: Date;

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [Groups], { nullable: true })
  @OneToMany(() => Groups, (groups) => groups.tournament, { eager: true })
  groups!: Groups[];

  @Field(() => GroupStage, { nullable: true })
  @OneToOne(() => GroupStage, (groupStage) => groupStage.tournament)
  @JoinColumn()
  groupStage!: GroupStage;

  @Field(() => Int)
  @Column({ default: 64 })
  maxTeams!: number;

  @Field(() => PlayOffs, { nullable: true })
  @OneToOne(() => PlayOffs, (playOffs) => playOffs.tournament)
  @JoinColumn()
  playOff!: PlayOffs;

  @Field(() => Status)
  @Column({ default: Status.scheduled })
  status!: Status;

  @Field(() => [Team])
  @ManyToMany((type) => Team, (team) => team.tournaments)
  @JoinTable()
  teams!: Team[];

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => Team, { nullable: true })
  winner?: Team | null;
}

import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Groups } from './Groups';
import { Tournament } from './Tournament';

@Entity()
@ObjectType()
export class GroupStage extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  advancePerGroup!: number;

  @Field(() => Tournament)
  @OneToOne(() => Tournament, (tournament) => tournament.groupStage)
  tournament!: Tournament;

  @Field(() => [Groups])
  @ManyToOne(() => Groups, (groups) => groups.groupStage)
  groups!: Groups[];
}

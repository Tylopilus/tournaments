import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  @OneToMany(() => Tournament, (tournament) => tournament.groupStages)
  tournament!: Tournament;
}

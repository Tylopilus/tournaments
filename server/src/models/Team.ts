import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
}

import { TeamInput } from '@root/input/TeamInput';
import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './Team';

export enum Status {
  scheduled = 'scheduled',
  openForRegistration = 'open for registration',
  groupPhase = 'group phase',
  eliminationPhase = 'elimination phase',
  done = 'done',
}

registerEnumType(Status, {
  name: 'Status',
});

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
}

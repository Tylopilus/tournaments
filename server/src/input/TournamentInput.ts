import { Field, ID, InputType, Int } from 'type-graphql';

import { Status, Tournament } from '@root/models/Tournament';
import { Team } from '@root/models/Team';

@InputType()
export class TournamentInput implements Partial<Tournament> {
  @Field(() => String)
  title!: string;

  @Field(() => Date, { nullable: true, defaultValue: new Date(Date.now()) })
  date?: Date;

  @Field(() => Int, { nullable: true })
  maxTeams?: number;
}

@InputType()
export class UpdateTournamentInput implements Partial<Tournament> {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  maxTeams?: number;

  @Field(() => Status, { nullable: true })
  status?: Status;
}

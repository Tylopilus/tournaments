import { Team } from '@root/models/Team';
import { Tournament } from '@root/models/Tournament';
import { Field, ID, InputType } from 'type-graphql';
import { TeamInput } from './TeamInput';

@InputType()
export class TournamentInput implements Partial<Tournament> {
  @Field(() => String)
  title!: string;

  @Field(() => Date, { nullable: true, defaultValue: new Date(Date.now()) })
  date?: Date;
}

@InputType()
export class UpdateTournamentInput implements Partial<Tournament> {
  @Field(() => String, { nullable: true })
  title?: string;
}

import { Field, InputType } from 'type-graphql';

import { Team } from '@root/models/Team';

@InputType()
export class TeamInput implements Partial<Team> {
  @Field()
  name!: string;

  @Field()
  player1!: string;

  @Field({ nullable: true })
  player2?: string;
}

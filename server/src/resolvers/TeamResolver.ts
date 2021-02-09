import { TeamInput } from '@root/input/TeamInput';
import { Team } from '@root/models/Team';
import { Tournament } from '@root/models/Tournament';
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
} from 'type-graphql';

@Resolver(() => Team)
export class TeamResolver {
  @Query(() => [Team])
  Teams() {
    return Team.find({ relations: ['tournaments', 'group'] });
  }

  @Query(() => Team)
  async Team(@Arg('id') teamId: string): Promise<Team> {
    return await Team.findOneOrFail(teamId, { relations: ['tournaments'] });
  }

  @Mutation(() => Team)
  async CreateTeam(@Arg('data') data: TeamInput): Promise<Team> {
    const team = Team.create(data);

    await team.save();
    return team;
  }
}

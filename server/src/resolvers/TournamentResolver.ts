import { Arg, Mutation, Query, Resolver } from 'type-graphql';

// import { Tournament } from '@root/models/Tournament';
import { Tournament } from '@root/models/Tournament';
import {
  TournamentInput,
  UpdateTournamentInput,
} from '@root/input/TournamentInput';
import { Team } from '@root/models/Team';

@Resolver()
export class TournamentResolver {
  @Query(() => [Tournament])
  Tournaments() {
    return Tournament.find({ relations: ['teams'] });
  }

  @Query(() => Tournament)
  async Tournament(@Arg('id') id: number) {
    const tournament = Tournament.findOne({
      where: { id },
      relations: ['teams'],
    });
    if (!tournament) throw new Error('cannt find tournament');

    return tournament;
  }

  @Mutation(() => Tournament)
  async CreateTournament(@Arg('data') data: TournamentInput) {
    const tournament = Tournament.create(data);
    await tournament.save();

    return tournament;
  }

  @Mutation(() => Tournament)
  async UpdateTournament(
    @Arg('ID') id: number,
    @Arg('data', { nullable: true }) data?: UpdateTournamentInput,
    @Arg('teamID', { nullable: true }) teamId?: number
  ) {
    const tournament = await Tournament.findOne({
      where: { id },
      relations: ['teams'],
    });
    if (!tournament) throw new Error('tournament not found!');
    if (data?.title) {
      tournament.title = data.title;
    }
    if (teamId) {
      const team = await Team.findOne({ where: { id: teamId } });

      if (!team) throw new Error('team not found!');

      if (tournament.teams?.find((t) => t.id === teamId))
        throw new Error('team already registered');

      tournament.teams = [...tournament.teams, team];
    }

    await tournament.save();
    return tournament;
  }
}

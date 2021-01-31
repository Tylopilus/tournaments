import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { Tournament } from '@root/models/Tournament';
import {
  TournamentInput,
  UpdateTournamentInput,
} from '@root/input/TournamentInput';
import { Team } from '@root/models/Team';

@Resolver()
export class TournamentResolver {
  @Query(() => [Tournament])
  async Tournaments() {
    const tournament = await Tournament.find({ relations: ['teams'] });
    return tournament;
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

  @Authorized()
  @Mutation(() => Tournament)
  async CreateTournament(@Arg('data') data: TournamentInput) {
    const tournament = Tournament.create(data);
    await tournament.save();

    return tournament;
  }

  @Mutation(() => Tournament)
  async UpdateTournament(
    @Arg('ID') id: number,
    @Arg('data') data: UpdateTournamentInput
  ) {
    const tournament = await Tournament.findOne({
      where: { id },
      relations: ['teams'],
    });
    if (!tournament) throw new Error('tournament not found!');

    Object.assign(tournament, data);

    await tournament.save();
    return tournament;
  }

  @Mutation(() => Tournament)
  async AddTeamToTournament(
    @Arg('tournamentID') tournamentID: number,
    @Arg('teamID') teamID: number
  ) {
    const tournament = await Tournament.findOne({
      where: { id: tournamentID },
      relations: ['teams'],
    });
    if (!tournament) throw new Error('tournament not found!');

    const team = await Team.findOne({ where: { id: teamID } });

    if (!team) throw new Error('team not found!');

    if (tournament.teams?.find((t) => t.id === teamID))
      throw new Error('team already registered');

    if (tournament.teams.length === tournament.maxTeams)
      throw new Error('cannot register more teams [maxTeams]');

    tournament.teams = [...tournament.teams, team];
    tournament.currentTeams = tournament.teams.length;

    tournament.save();

    return tournament;
  }
}

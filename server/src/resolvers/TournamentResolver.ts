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
    const tournament = await Tournament.find({
      relations: ['teams', 'winner', 'playOff', 'groupStages'],
    });
    return tournament;
  }

  @Query(() => Tournament)
  async Tournament(@Arg('id') id: number) {
    const tournament = Tournament.findOne({
      where: { id },
      relations: ['teams', 'winner'],
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
    @Arg('data', { nullable: true }) data?: UpdateTournamentInput,
    @Arg('winnderID', { nullable: true }) winnerID?: number
  ) {
    const tournament = await Tournament.findOne({
      where: { id },
      relations: ['teams', 'winner'],
    });
    if (!tournament) throw new Error('tournament not found!');
    if (winnerID) {
      const winnerTeam = await Team.findOne({ where: { id: winnerID } });

      if (!winnerTeam) throw new Error('WinnerID not found');

      tournament.winner = winnerTeam;
    }

    if (data) Object.assign(tournament, data);

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
      relations: ['teams', 'winner'],
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

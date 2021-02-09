import {
  Arg,
  Authorized,
  ConflictingDefaultWithNullableError,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql';

import { Tournament } from '@root/models/Tournament';
import {
  TournamentInput,
  UpdateTournamentInput,
} from '@root/input/TournamentInput';
import { Team } from '@root/models/Team';
import { Status } from '@root/Enums/Status';
import { ApolloError } from 'apollo-server';
import { GroupStage } from '@root/models/GroupStage';

@Resolver(() => Tournament)
export class TournamentResolver implements ResolverInterface<Tournament> {
  @FieldResolver()
  async winner() {
    const winner = await Team.findOne({ where: { id: 1 } });
    return winner ? winner : null;
  }
  @Query(() => [Tournament])
  async Tournaments() {
    const tournament = await Tournament.find({
      relations: ['teams', 'playOff', 'groupStage', 'groups'],
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
  async CreateTournament(
    @Arg('data') data: TournamentInput,
    @Arg('advancingTeams') advancingTeams: number
  ) {
    const tournament = Tournament.create(data);
    await tournament.save();

    const groupStage = GroupStage.create();
    groupStage.advancePerGroup = advancingTeams;
    await groupStage.save();
    return tournament;
  }

  @Authorized()
  @Mutation(() => Tournament)
  async UpdateTournament(
    @Arg('ID') id: number,
    @Arg('data', { nullable: true }) data?: UpdateTournamentInput
  ) {
    const tournament = await Tournament.findOne({
      where: { id },
      relations: ['teams', 'winner'],
    });
    if (!tournament) throw new Error('tournament not found!');

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
      relations: ['teams'],
    });
    if (!tournament) throw new ApolloError('tournament not found!');

    if (tournament.status !== Status.openForRegistration)
      throw new ApolloError(
        `Tournament is not open for registration. Tournament is ${tournament.status}`
      );
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

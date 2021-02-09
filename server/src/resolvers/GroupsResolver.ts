import { Status } from '@root/Enums/Status';
import { Groups } from '@root/models/Groups';
import { Tournament } from '@root/models/Tournament';
import { GenerateGroups } from '@root/utils/GenerateGroups';
import { ApolloError } from 'apollo-server';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class GroupsResolver {
  @Mutation(() => [Groups])
  async GenerateGroups(@Arg('tournamentId') id: number) {
    const tournament = await Tournament.findOneOrFail({
      where: { id },
      relations: ['teams'],
    });
    if (tournament.status !== Status.openForRegistration)
      throw new ApolloError('Groups have already been generated');

    const groups = GenerateGroups(2, tournament.teams);
    const ret = groups.map(async (group) => {
      const newGroup = Groups.create();
      newGroup.teams = group.teams;
      newGroup.tournament = tournament;
      await newGroup.save();
      return newGroup;
    });

    tournament.status = Status.groupPhase;
    await tournament.save();
    return ret;
  }

  @Query(() => [Groups])
  async Groups() {
    return Groups.find({ relations: ['teams'] });
  }
}

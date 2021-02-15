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
      relations: ['teams', 'groupStage', 'groups'],
    });
    if (tournament.status !== Status.openForRegistration)
      throw new ApolloError('Groups have already been generated');

    const generatedGroups = GenerateGroups(2, tournament.teams);
    const ret = await Promise.all(
      generatedGroups.map(async (group) => {
        const newGroup = Groups.create();
        newGroup.teams = group.teams;
        newGroup.groupStage = tournament.groupStage;
        await newGroup.save();
        return newGroup;
      })
    );

    console.log(ret);
    tournament.status = Status.groupPhase;
    tournament.groups = ret;
    await tournament.save();
    console.log(JSON.stringify(tournament, null, 2));
    return ret;
  }

  @Query(() => [Groups])
  async Groups() {
    return Groups.find({ relations: ['teams', 'tournament'] });
  }
}

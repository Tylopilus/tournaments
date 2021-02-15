import { Status } from '@root/Enums/Status';
import { Groups } from '@root/models/Groups';
import { GroupStage } from '@root/models/GroupStage';
import { Tournament } from '@root/models/Tournament';
import { ApolloError } from 'apollo-server';
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql';
import { Repository } from 'typeorm';

@Resolver(() => GroupStage)
export class GroupStageResolver implements ResolverInterface<GroupStage> {
  @FieldResolver()
  test(@Root() groupStage: GroupStage) {
    return groupStage.id;
  }
  // @FieldResolver()
  // async groups(@Root() groupStage: GroupStage): Promise<Groups[]> {
  //   return await Groups.createQueryBuilder()
  //     .leftJoin('tournament', 't')
  //     .where('t.id = :id', { id: groupStage.id })
  //     .getMany();
  // }

  @Query(() => [GroupStage])
  async GroupStage(@Arg('tournamentId') id: number) {
    return await GroupStage.find({ relations: ['groups'] });
    // return await GroupStage.findByIds([id]);
  }
  @Mutation(() => Boolean)
  async GenerateGroupStage(@Arg('tournamentId') id: number) {
    const tournament = await Tournament.findOneOrFail({ where: { id } });
    if (tournament.status !== Status.groupPhase)
      throw new ApolloError(
        `cannot create GroupPhase. Tournament is not in correct state`
      );
    const groups = await Groups.createQueryBuilder()
      .leftJoin('tournament', 't')
      .where('t.id = :id', { id })
      .getMany();

    console.log(groups);
    return true;
  }
}

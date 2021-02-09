import { Status } from '@root/Enums/Status';
import { Groups } from '@root/models/Groups';
import { Tournament } from '@root/models/Tournament';
import { ApolloError } from 'apollo-server';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class GroupStageResolver {
  @Mutation(() => Boolean)
  async GenerateGroupStage(@Arg('id') id: number) {
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

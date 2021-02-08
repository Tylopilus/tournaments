import { Groups } from '@root/models/Groups';
import { Team } from '@root/models/Team';
import { Tournament } from '@root/models/Tournament';
import { GenerateGroups } from '@root/utils/GenerateGroups';
import { Arg, Query, Resolver } from 'type-graphql';
import { createQueryBuilder } from 'typeorm';

@Resolver()
export class GroupsResolver {
  @Query(() => [Groups])
  async GenerateGroups(@Arg('id') id: number) {
    const teams = await createQueryBuilder<Team>('team')
      .leftJoin('team', 'tournament')
      .where('tournament.id = :id', { id })
      .getMany();
    const teams2 = await Tournament.findOne({
      where: { id },
      relations: ['teams'],
    });
    const groups = GenerateGroups(2, teams);
    return groups.map(async (group) => {
      const tgroup = Groups.create();
      tgroup.teams = group.teams;
      await tgroup.save();
      return tgroup;
    });
  }
}

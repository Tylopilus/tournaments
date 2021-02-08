import { Team } from '@root/models/Team';

function generateSingleGroup(
  modulo: number,
  offset: number,
  groupObject: Team[]
) {
  const teams = groupObject
    .slice(offset, groupObject.length)
    .reduce<Team[]>((prev, curr, index) => {
      if (!(index % modulo)) return [...prev, curr];
      return prev;
    }, []);

  return { teams };
}

// TODO: Make return Groups'Object Array
export function GenerateGroups(groupCount: number, groupObject: Team[]) {
  const result = [];
  for (let i = 0; i < groupCount; i++) {
    result.push(generateSingleGroup(groupCount, i, groupObject));
  }
  return result;
}

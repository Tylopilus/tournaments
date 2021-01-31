const groups = [
  {
    id: 1,
    name: 'team 1',
  },
  {
    id: 2,
    name: 'team 2',
  },
  {
    id: 3,
    name: 'team 3',
  },
  {
    id: 4,
    name: 'team 4',
  },
  {
    id: 5,
    name: 'team 5',
  },
  {
    id: 6,
    name: 'team 6',
  },
  {
    id: 7,
    name: 'team 7',
  },
  {
    id: 8,
    name: 'team 8',
  },
];

const final = [
  {
    id: 'group1',
    teams: [
      {
        id: 1,
        name: 'team 1',
      },
      {
        id: 3,
        name: 'team 3',
      },
      {
        id: 5,
        name: 'team 5',
      },
      {
        id: 7,
        name: 'team 7',
      },
    ],
  },
  {
    id: 'group2',
    teams: [
      {
        id: 2,
        name: 'team 2',
      },
      {
        id: 4,
        name: 'team 4',
      },
      {
        id: 6,
        name: 'team 6',
      },
      {
        id: 8,
        name: 'team 8',
      },
    ],
  },
];

// console.log(final[0]);

const groupCount = 2;

function generateSingleGroup(modulo, offset, groupObject) {
  const group = groupObject
    .slice(offset, groupObject.length)
    .reduce((result, group, index) => {
      //   !(index % modulo) ? result.push(group) : null;
      if (!(index % modulo)) return [...result, group];
      return result;
    }, []);

  return { id: `group${offset}`, teams: group };
}

function generateGroups(groupCount, groupObject) {
  const result = [];
  for (let i = 0; i < groupCount; i++) {
    result.push(generateSingleGroup(groupCount, i, groupObject));
  }
  return result;
}
console.log(JSON.stringify(generateGroups(groupCount, groups), null, 2));

// const shuffeld = groups.sort(() => Math.random() - 0.5);

// console.log(groups.slice(0, groups.length / 2));

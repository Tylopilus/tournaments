{
  tournament: {
    name: 'tournament1';
    maxTeams: 6;
    currentTeams: 6;
    status: 'final';
    groupStage: {
      advancePerGroup: 2;
      groups: [
        {
          advancingTeams: ['team1', 'team2'],
          group1: [
            { name: 'team1', wins: 2 },
            { name: 'team2', wins: 1 },
            { name: 'team3', wins: 0 },
          ],
        },
        {
          advancingTeams: ['team6', 'team4'],
          group2: [
            { name: 'team4', wins: 1 },
            { name: 'team5', wins: 0 },
            { name: 'team6', wins: 2 },
          ],
        },
      ];
      //total matches per group = n/2*(n-1)
      matches: [
        {
          name: 'swiss-1',
          scheduledAt: '2021-02-07 16:59h',
          score1: 10,
          score2: 3,
          status: 'final',
          team1: 'team1',
          team2: 'team2',
          winner: 'team1',
        },
        {
          name: 'swiss-2',
          scheduledAt: '2021-02-07 16:59h',
          score1: 10,
          score2: 9,
          status: 'final',
          team1: 'team1',
          team2: 'team3',
          winner: 'team1',
        },
        {
          name: 'swiss-3',
          scheduledAt: '2021-02-07 16:59h',
          score1: 10,
          score2: 7,
          status: 'final',
          team1: 'team2',
          team2: 'team3',
          winner: 'team2',
        },
        {
          name: 'swiss-4',
          scheduledAt: '2021-02-07 16:59h',
          score1: 10,
          score2: 1,
          status: 'final',
          team1: 'team4',
          team2: 'team5',
          winner: 'team4',
        },
        {
          name: 'swiss-5',
          scheduledAt: '2021-02-07 16:59h',
          score1: 0,
          score2: 10,
          status: 'final',
          team1: 'team4',
          team2: 'team6',
          winner: 'team6',
        },
        {
          name: 'swiss-6',
          scheduledAt: '2021-02-07 16:59h',
          score1: 1,
          score2: 10,
          status: 'final',
          team1: 'team5',
          team2: 'team6',
          winner: 'team7',
        },
      ];
    }
    playoffs: {
      status: 'final';
      winner: 'team1';
      matches: [
        {
          name: 'semi-final1',
          scheduledAt: '2021-02-07 18:00h',
          score1: 10,
          score2: 7,
          status: 'final',
          team1: 'team1',
          team2: 'team4',
          winner: 'team1',
        },
        {
          name: 'semi-final2',
          scheduledAt: '2021-02-07 19:00h',
          score1: 10,
          score2: 7,
          status: 'final',
          team1: 'team6',
          team2: 'team2',
          winner: 'team6',
        },
        {
          name: 'final',
          scheduledAt: '2021-02-07 20:00h',
          score1: 10,
          score2: 8,
          status: 'final',
          team1: 'team1',
          team2: 'team5',
          winner: 'team1',
        },
      ];
    }
  }
}

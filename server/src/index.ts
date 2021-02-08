import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { TournamentResolver } from './resolvers/TournamentResolver';
import { TeamResolver } from './resolvers/TeamResolver';
import { GroupsResolver } from './resolvers/GroupsResolver';

async function main() {
  createConnection();
  const schema = await buildSchema({
    resolvers: [TournamentResolver, TeamResolver, GroupsResolver],
    authChecker: ({ context }) => {
      return context.req.headers.user === 'peterFox';
    },
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
      };
      return context;
    },
  });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();

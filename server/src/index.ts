import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { TournamentResolver } from './resolvers/TournamentResolver';
import { TeamResolver } from './resolvers/TeamResolver';

async function main() {
  createConnection();
  const schema = await buildSchema({
    resolvers: [TournamentResolver, TeamResolver],
  });
  const server = new ApolloServer({ schema });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();

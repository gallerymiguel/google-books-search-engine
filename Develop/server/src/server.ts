import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Apply Apollo GraphQL middleware and specify the path
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => ({ req })  // if you have authentication or other context setup
  }));

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();

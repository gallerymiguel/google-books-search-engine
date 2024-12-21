import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors'; // Import cors
import bodyParser from 'body-parser';
import path from 'node:path';
import db from './config/connection.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const app = express();
  const PORT = process.env.PORT || 3001;

  // Use CORS middleware with specific settings
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  app.use(bodyParser.json());
  app.use('/graphql', expressMiddleware(server, {
    context: authenticateToken,
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

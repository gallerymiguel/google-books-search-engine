import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import type { Request, Response } from 'express';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import db from './config/connection.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db(); // Connect to the database

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Middleware to parse incoming requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apply GraphQL middleware with context for authentication
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: ({ req }) => authenticateToken({ req }),
    })
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

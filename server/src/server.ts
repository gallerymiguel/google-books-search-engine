import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors'; // Import cors
import bodyParser from 'body-parser';
// import path from 'node:path';
// import { fileURLToPath } from 'url'; 
import db from './config/connection.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

// Define __dirname manually
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const app = express();
  const PORT = process.env.PORT || 3001;

  // Updated CORS middleware with specific settings
  app.use(cors({
    origin: 'https://google-books-search-engine-friontend.onrender.com', // Add your production frontend URL here
    credentials: true
  }));

  app.use(bodyParser.json());
  app.use('/graphql', expressMiddleware(server, {
    context: authenticateToken,
  }));

  // if (process.env.NODE_ENV === 'production') {
  //   app.use(express.static(path.join(__dirname, '../client/dist')));
    
  //   app.get('*', (_req, res) => {
  //     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  //   });
  // }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

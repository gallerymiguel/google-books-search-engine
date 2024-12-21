import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY || 'fallbackSecret'; // Fallback for development
const expiration = '2h';

// Middleware to authenticate token
export const authenticateToken = ({ req }: { req: any }) => {
  // Allows token to be sent via body, query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If token is in the Authorization header, extract it
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token, return the request unmodified
  if (!token) {
    return req;
  }

  // Try to verify the token
  try {
    const { data } = jwt.verify(token, secretKey, { maxAge: expiration }) as { data: any };
    // Attach the user data to the request object
    req.user = data;
  } catch (err) {
    console.log('Invalid token'); // Log token verification errors
  }

  return req; // Return the modified request object
};

// Function to sign a JWT token
export const signToken = (username: string, email: string, _id: unknown) => {
  // Create a payload with user data
  const payload = { username, email, _id };

  // Sign the token with the payload, secret, and expiration
  return jwt.sign({ data: payload }, secretKey, { expiresIn: expiration });
};

// Custom AuthenticationError class for GraphQL
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};

import { gql } from '@apollo/server';

export const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    bookId: String!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    books: [Book]
    book(bookId: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

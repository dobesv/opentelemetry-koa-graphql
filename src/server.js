// @flow strict
import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './schema.gql';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server: $FlowFixMe = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server;

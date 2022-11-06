import React from 'react';
import StoryRouter from 'storybook-react-router';
import { storiesOf } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-react';

import CreateBook from '.';

const typeDefs = `
type Query {
  _dummy: String
}

type Mutation {
  createBook(writerId: ID!, title: String!, url: String, yearPublished: String, yearRead: String!): Book!
}

type Book {
  writer: Writer!
  id: ID!
  title: String!
  url: String
  yearPublished: String
  yearRead: String!
}

type Writer {
  id: ID!
  name: String!
  surname: String!
  homepage: String
  nationality: String
  books: [Book!]
}

schema {
  mutation: Mutation 
  query: Query
}

`;

const mocks = {
  Mutation: () => ({
    id: '999-555',
    title: 'what',
    url: 'oj.org',
    yearPublished: 'ever',
    yearRead: '19 hundra',
  }),
};

storiesOf('CreateBook', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
  .addDecorator(
    StoryRouter({}, {
      routes: [
        { },
      ],
    }),
  )
  .add('default', () => <CreateBook />);

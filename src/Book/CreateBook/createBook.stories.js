import React from "react";
import StoryRouter from 'storybook-react-router';
import { storiesOf } from "@storybook/react";
import apolloStorybookDecorator from "apollo-storybook-react";

import CreateBook from '.';

const typeDefs = `
type Query {
  _dummy: String
}

type Mutation {
  createBook(title: String!, yearRead: String!, writerId: ID!, yearPublished: String): Book!
}

type Book {
  id: ID!
  title: String!
  yearPublished: String
  yearRead: String!
  writer: Writer!
}

type Writer {
  id: ID!
  name: String!
  surname: String!
  homepage: String
  books: [Book!]
}

schema {
  mutation: Mutation 
  query: Query
}

`;

const mocks = {
  Mutation: () => {
    return {
      id: '999-555',
      title: 'what',
      yearPublished: 'ever',
      yearRead: '19 hundra',
    }
  }
};

storiesOf("CreateBook", module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks
    })
  )
  .addDecorator(
    StoryRouter({}, {
      routes: [
        { },
      ]})
  )
  .add("default", () => {
    return <CreateBook />;
  });

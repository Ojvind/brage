import React from "react";
import StoryRouter from 'storybook-react-router';
import { storiesOf } from "@storybook/react";
import apolloStorybookDecorator from "apollo-storybook-react";

import WriterList from '.';

import '../../styles/importer.scss'

const typeDefs = `
  type Query {
    helloWorld: String
  }

  type Mutation {
    createWriter(name: String!, surname: String!, homepage: String): Writer!
  }

  type Writer {
    id: ID!
    name: String!
    surname: String!
    homepage: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const mocks = {
  Query: () => {
    return {
      helloWorld: () => {
        return "Hello from Apollo!!";
      }
    };
  }
};

export const writersData = {
  edges:[{
  id: '555-999',
  name: 'Öjvind',
  surname: 'Otterbjörk',
  homepage: 'http://ojvind.otterbjork.com',
},{
  id: '999-123',
  name: 'Andrew',
  surname: 'Eldrich',
  homepage: 'http://www.the-sisters-of-mercy.com/',
}],
pageInfo: {
  hasNextPage: false,
  endCursor: 'södljfsödljf'
}};

export const matchData = {
  url: '/writer',
};

storiesOf("WriterList", module)
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
    return <WriterList 
    writers={writersData} 
    match={matchData} 
    loading={false}
    fetchMore={() => {}}
  />;
  });

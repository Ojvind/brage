import React from "react";
import StoryRouter from 'storybook-react-router';
import { storiesOf } from "@storybook/react";
import apolloStorybookDecorator from "apollo-storybook-react";

import BookList from '.';

const typeDefs = `
  type Query {
    helloWorld: String
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

export const booksData = {
  edges:[{
  id: '555-999',
  title: 'Prosaiska Eddan',
  yearPublished: '1220',
  yearRead: '2021',
},{
  id: '999-123',
  title: 'Poetic Edda',
  yearPublished: '1200',
  yearRead: '2021',
}],
pageInfo: {
  hasNextPage: false,
  endCursor: 'södljfsödljf'
}};

export const matchData = {
  url: '/Book',
};

storiesOf("BookList", module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
    })
  )
  .addDecorator(
    StoryRouter({}, {
      routes: [
        { },
      ]})
  )
  .add("default", () => {
    return <BookList 
    books={booksData} 
    match={matchData} 
    loading={false}
    fetchMore={() => {}}
  />;
  });

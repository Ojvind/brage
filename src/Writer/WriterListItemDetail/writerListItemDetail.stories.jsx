import React from 'react';
import StoryRouter from 'storybook-react-router';
import { storiesOf } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-react';

import WriterListItemDetail from './WriterListItemDetail';

import '../../styles/importer.scss';

const typeDefs = `
  type Query {
    helloWorld: String
  }

  type Mutation {
    createWriter(name: String!, surname: String!, homepage: String, nationality: String): Writer!
  }

  type Writer {
    id: ID!
    name: String!
    surname: String!
    homepage: String
    nationality: String    
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export const writer = { // eslint-disable-line import/prefer-default-export
  id: '555-999',
  name: 'Öjvind',
  surname: 'Otterbjörk',
  homepage: 'http://ojvind.otterbjork.com',
  nationality: 'Svensk',
};

storiesOf('WriterListItemDetail', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
    }),
  )
  .addDecorator(
    StoryRouter({}, {
      routes: [
        { },
      ],
    }),
  )
  .add('default', () => <WriterListItemDetail writer={writer} />);

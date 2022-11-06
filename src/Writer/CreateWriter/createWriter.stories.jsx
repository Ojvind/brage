import React from 'react';
import StoryRouter from 'storybook-react-router';
import { storiesOf } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-react';

import CreateWriter from '.';

const typeDefs = `
type Query {
  _dummy: String
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
  mutation: Mutation 
  query: Query
}

`;

const mocks = {
  Mutation: () => ({
    id: '555-999',
    name: 'Öjvind',
    surname: 'Otterbjörk',
    homepage: 'ojvind.otterbjork.com',
    nationality: 'Svensk'
  }),
};

storiesOf('CreateWriter', module)
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
  .add('default', () => <CreateWriter />);

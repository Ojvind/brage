import gql from 'graphql-tag';

export const CREATE_WRITER = gql`
  mutation($name: String!, $surname: String!, $homepage: String) {
    createWriter(name: $name , surname: $surname, homepage: $homepage) {
      id
      name
      surname
      homepage
    }
  }
`;

export const UPDATE_WRITER = gql`
mutation ($id: ID!, $name: String!, $surname: String!, $homepage: String ) {
  updateWriter (id: $id, name: $name, surname: $surname, homepage: $homepage
    ) {
      name
      surname
      homepage
    }
  }
`;

export const DELETE_WRITER = gql`
  mutation (
    $id: ID!
  ) {
    deleteWriter (
      id: $id
    ) 
  }
`;


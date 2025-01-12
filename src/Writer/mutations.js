import gql from 'graphql-tag';

export const CREATE_WRITER = gql`
  mutation($name: String!, $surname: String!, $homepage: String, $nationality: String) {
    createWriter(name: $name , surname: $surname, homepage: $homepage, nationality: $nationality) {
      id
      name
      surname
      homepage
      portraitimageurl
      nationality
    }
  }
`;

export const UPDATE_WRITER = gql`
mutation ($id: ID!, $name: String!, $surname: String!, $homepage: String, $portraitimageurl: String, $nationality: String ) {
  updateWriter (id: $id, name: $name, surname: $surname, homepage: $homepage, portraitimageurl: $portraitimageurl, nationality: $nationality) {
      name
      surname
      homepage
      portraitimageurl
      nationality
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

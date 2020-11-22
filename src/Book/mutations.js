import gql from 'graphql-tag';

export const CREATE_BOOK = gql`
  mutation (
    $title: String!, 
    $yearRead: String!, 
    $writerId: ID!, 
    $yearPublished: String
  ) {
    createBook(
      title: $title, 
      yearRead: $yearRead, 
      writerId: $writerId, 
      yearPublished: $yearPublished
    ) {
      id
      title
      yearRead
      yearPublished
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation (
    $id: ID!,
    $title: String!, 
    $yearRead: String!, 
    $yearPublished: String
  ) {
    updateBook(
      id: $id,
      title: $title, 
      yearRead: $yearRead, 
      yearPublished: $yearPublished
    ) {
      id
      title
      yearRead
      yearPublished
    }
  }
`;

import gql from 'graphql-tag';

export const CREATE_BOOK = gql`
  mutation (
    $writerId: ID!,
    $title: String!,
    $url: String!,
    $yearPublished: String,
    $yearRead: String!,
    $description: String,
  ) {
    createBook(
      writerId: $writerId,
      title: $title,
      url: $url
      yearRead: $yearRead, 
      yearPublished: $yearPublished,
      description: $description,
      ) {
      id
      title
      url
      yearPublished
      yearRead
      description
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation (
    $bookId: ID!
  ) {
    deleteBook(
      id: $bookId
    )
  } 
`;

export const UPDATE_BOOK = gql`
  mutation (
    $id: ID!,
    $title: String!,
    $url: String!,
    $yearPublished: String,
    $yearRead: String!,
    $description: String,
  ) {
    updateBook(
      id: $id,
      title: $title,
      url: $url,
      yearPublished: $yearPublished,
      yearRead: $yearRead,
      description: $description,
    ) {
      id
      title
      url
      yearPublished
      yearRead
      description
    }
  }
`;

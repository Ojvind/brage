import gql from 'graphql-tag';

export const GET_BOOKS = gql`
query($writerId: ID, $cursor: String) {
    books(writerId: $writerId, limit:10, cursor: $cursor) {
      edges {
        id
        title
        yearPublished
        yearRead
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_BOOK = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      title
      yearPublished
      yearRead
      createdAt
    }
  }
`;

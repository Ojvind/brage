import gql from 'graphql-tag';

export const GET_BOOKS = gql`
query($writerId: ID, $cursor: String) {
    books(writerId: $writerId, limit:10, cursor: $cursor) {
      edges {
        id
        title
        url
        yearPublished
        yearRead
        createdAt
        writer {
          id
        }
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
      url
      yearPublished
      yearRead
      createdAt
    }
  }
`;

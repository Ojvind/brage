import gql from 'graphql-tag';

export const GET_ALL_BOOKS = gql`
query($cursor: String) {
  allBooks(limit: 10000, cursor: $cursor) {
    edges {
      id
      title
      url
      yearPublished
      yearRead
      description
      portraitimageurl
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

export const GET_BOOKS = gql`
query($writerId: ID, $cursor: String) {
    books(writerId: $writerId, limit:10, cursor: $cursor) {
      edges {
        id
        title
        url
        yearPublished
        yearRead
        description
        portraitimageurl
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
  query($bookId: ID!) {
    book(bookId: $bookId) {
      id
      title
      url
      yearPublished
      yearRead
      description
      portraitimageurl
      createdAt
      writer {
        id
        name
        surname
      }
    }
  }
`;

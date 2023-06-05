import gql from 'graphql-tag';
import { WRITER_FRAGMENT, WRITER_WITH_BOOKS_FRAGMENT, WRITERS_WITH_BOOKS_FRAGMENT } from './fragments';

export const GET_WRITER = gql`
  query($id: ID!) {
    writer(id: $id) {
      ...writer
    }
  }
  ${WRITER_FRAGMENT}
`;

export const GET_WRITERS = gql`
  query($cursor: String) {
    writers(
      limit: 100
      cursor: $cursor
    ) {
      edges {
        ...writer
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${WRITER_FRAGMENT}
`;

export const GET_WRITER_WITH_BOOKS = gql`
  query($id: ID!) {
    writer(id: $id) {
      ...writer_with_books
    }
  }
  ${WRITER_WITH_BOOKS_FRAGMENT}
`;

export const GET_WRITERS_WITH_BOOKS = gql`
  query($cursor: String) {
    writers(
      limit: 100
      cursor: $cursor
    ) {
      ...writers_with_books
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  ${WRITERS_WITH_BOOKS_FRAGMENT}
`;

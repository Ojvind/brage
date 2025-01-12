import gql from 'graphql-tag';

export const WRITER_FRAGMENT = gql`
  fragment writer on Writer {
    id
    name
    surname
    homepage
    portraitimageurl
    nationality
  }
`;

export const BOOK_FRAGMENT = gql`
  fragment book on Book {
    id
    title 
    yearPublished
    yearRead
    createdAt  
  }
`;

export const WRITER_WITH_BOOKS_FRAGMENT = gql`
  fragment writer_with_books on Writer {
    ...writer
    books {
      ...book
    }
  }
  ${BOOK_FRAGMENT}  
  ${WRITER_FRAGMENT}  
`;

export const WRITERS_WITH_BOOKS_FRAGMENT = gql`
  fragment writers_with_books on WriterConnection {
    edges {
      ...writer
      books {
        ...book
      }
    }
  }
  ${BOOK_FRAGMENT}  
  ${WRITER_FRAGMENT}  
`;

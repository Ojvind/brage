import React from 'react';
import FetchMore from '../../FetchMore';
import BookListItem from '../BookListItem';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    books: {
      ...previousResult.books,
      ...fetchMoreResult.books,
      edges: [
        ...previousResult.books.edges,
        ...fetchMoreResult.books.edges,
      ],
    },
  };
};

const BookList = ({
  match,
  books,
  loading,
  fetchMore,
}) => {
  return (
    <div>
      <div>
        <div className="book-list__headerrow">
          <div className="book-list__id">
            Id
          </div>
          <div className="book-list__title">
            Title
          </div>
          <div className="book-list__yearPublished">
            Published
          </div>
          <div className="book-list__yearRead">
            Read
          </div>
          <div className="book-list__createdAt">
            created at
          </div>
        </div>
        {books.edges.map(( book ) => {
            return (
              <BookListItem
                match={match}
                book={book}
              />
            )
          })}

          <FetchMore
            loading={loading}
            hasNextPage={books.pageInfo.hasNextPage}
            variables={{
              cursor: books.pageInfo.endCursor,
            }}
            updateQuery={updateQuery}
            fetchMore={fetchMore}
          >
            Books
          </FetchMore>
        </div>
    </div>
  )
};

export default BookList;

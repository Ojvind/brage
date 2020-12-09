import React from 'react';
import PropTypes from 'prop-types';
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
}) => (
  <div>
    <div>
      <div className="book-list__headerrow">
        <div className="book-list__title">
          Title
        </div>
        <div className="book-list__yearPublished">
          Published (Year)
        </div>
        <div className="book-list__yearRead">
          Read (Year)
        </div>
        <div className="book-list__createdAt">
          created at
        </div>
      </div>
      {books.edges.map((book) => (
        <BookListItem
          match={match}
          book={book}
          key={book.id}
        />
      ))}

      <FetchMore
        loading={loading}
        hasNextPage={books.pageInfo.hasNextPage}
        variables={{
          cursor: books.pageInfo.endCursor,
        }}
        updateQuery={updateQuery}
        fetchMore={fetchMore}
      >
        Boooooks
      </FetchMore>
    </div>
  </div>
);

BookList.propTypes = {
  books: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({})),
    pageInfo: PropTypes.PropTypes.shape({
      hasNextPage: PropTypes.bool,
      endCursor: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default BookList;

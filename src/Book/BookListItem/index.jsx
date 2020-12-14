import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../Button';
import { DELETE_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';
import ErrorMessage from '../../Error';

const deleteBookMutation = (bookId, writerId) => (
  <Mutation
    mutation={DELETE_BOOK}
    variables={{ bookId }}
    refetchQueries={[
      {
        query: GET_BOOKS,
        variables: { writerId },
      },
    ]}
  >
  {(deleteBook, { data, loading, error }) => {
    const button = (
      <Button
        className="RepositoryItem-title-action"
        onClick={deleteBook}
      >
        {bookId}
      </Button>
    )
    if (error) {
      return (
        <div>
          <ErrorMessage error={error} />
          { button }
        </div>
      );
    }
    return (
      <div className="create-book__button">
        {button}
      </div>
    );

  }}
  </Mutation>
);

const BookListItem = ({ book, writerId }) => (
  <div className="book-list__listrow" key={book.id}>
    <span className="book-list__title">
      {/* Maybe this is the link I really want? See below. Try to make that one work instead!! */}
      {/* <Link to={`${match.url}/${book.id}/${book.title}`}>{book.title} </Link> */}
      <Link to={`/books/${book.id}/${book.title}`}>
        {book.title}
        {' '}
      </Link>
    </span>
    <span className="book-list__yearPublished">
      {book.yearPublished}
    </span>
    <span className="book-list__yearRead">
      {book.yearRead}
    </span>
    <span className="book-list__createdAt">
      {book.createdAt}
    </span>
    <span>
      {deleteBookMutation(book.id, writerId)}
    </span>
  </div>
);


BookListItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    yearRead: PropTypes.string,
    yearPublished: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default BookListItem;

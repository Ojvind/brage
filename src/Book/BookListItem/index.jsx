import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { DELETE_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';
import ErrorMessage from '../../Error';
import ConfirmDialog from '../../Shared/ConfirmDialog';

function DeleteBookMutation(bookId, writerId) {
  const [open, setConfirmOpen] = useState(false);

  return (
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
        <div>
          <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)}>
            <DeleteIcon />
          </IconButton>
          <ConfirmDialog
            title="Delete book?"
            open={open}
            setOpen={setConfirmOpen}
            onConfirm={deleteBook}
          >
            Are you sure you want to delete this book?
          </ConfirmDialog>
        </div>
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
        <div>
          {button}
        </div>
      );

    }}
    </Mutation>
  );
} 

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
      {DeleteBookMutation(book.id, writerId)}
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

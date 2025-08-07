import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { DELETE_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';
import ErrorMessage from '../../Error';
import ConfirmDialog from '../../Shared/components/ConfirmDialog';

const DeleteBookMutation = ({ bookId, writerId }) => {
  const [open, setConfirmOpen] = useState(false);
  const [deleteBook, { error }] = useMutation(DELETE_BOOK, {
    variables: { bookId },
    refetchQueries: [
      {
        query: GET_BOOKS,
        variables: { writerId },
      },
    ],
  });

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
  );

  if (error) {
    return (
      <div>
        <ErrorMessage error={error} />
        {button}
      </div>
    );
  }
  return <div>{button}</div>;
};

DeleteBookMutation.propTypes = {
  bookId: PropTypes.string.isRequired,
  writerId: PropTypes.string.isRequired,
};

export default DeleteBookMutation;

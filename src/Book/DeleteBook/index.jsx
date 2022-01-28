import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { DELETE_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';
import ErrorMessage from '../../Error';
import ConfirmDialog from '../../Shared/ConfirmDialog';

const DeleteBookMutation = ({ bookId, writerId }) => {
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
      {(deleteBook, { data, loading, error }) => { // eslint-disable-line no-unused-vars
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
};

DeleteBookMutation.propTypes = {
  bookId: PropTypes.string.isRequired,
  writerId: PropTypes.string.isRequired,
};

export default DeleteBookMutation;

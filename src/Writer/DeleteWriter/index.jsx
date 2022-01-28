import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { DELETE_WRITER } from '../mutations';
import { GET_WRITERS } from '../queries';
import ErrorMessage from '../../Error';
import ConfirmDialog from '../../Shared/ConfirmDialog';

const DeleteWriterMutation = ({ writerId }) => {
  const [open, setConfirmOpen] = useState(false);

  return (
    <Mutation
      mutation={DELETE_WRITER}
      variables={{ id: writerId }}
      refetchQueries={[
        {
          query: GET_WRITERS,
        },
      ]}
    >
      {(deleteWriter, { data, loading, error }) => { // eslint-disable-line no-unused-vars
        const button = (
          <div>
            <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)}>
              <DeleteIcon />
            </IconButton>
            <ConfirmDialog
              title="Delete Post?"
              open={open}
              setOpen={setConfirmOpen}
              onConfirm={deleteWriter}
            >
              Are you sure you want to delete this writer?
              (it will also delete all his/her books...)
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

DeleteWriterMutation.propTypes = {
  writerId: PropTypes.string.isRequired,
};

export default DeleteWriterMutation;

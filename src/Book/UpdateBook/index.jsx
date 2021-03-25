import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import SaveButton from '../../Shared/Button/SaveButton';
import EditButton from '../../Shared/Button/EditButton';

import { UPDATE_BOOK } from '../mutations';
import { GET_BOOK } from '../queries';
import ErrorMessage from '../../Error';

function toggleChange(updateBook, toggleEdit, edit) {
  updateBook();
  toggleEdit(!edit);
}

function UpdateBook({ book, edit, toggleEdit }) {
  return (
    (!edit)
      ? (
        <EditButton
          onClick={() => toggleChange(() => {}, toggleEdit, edit)}
        >
          Edit
        </EditButton>
      )
      : (
        <Mutation
          mutation={UPDATE_BOOK}
          variables={{
            id: book.id,
            title: book.title,
            yearPublished: book.yearPublished,
            yearRead: book.yearRead,
          }}
          refetchQueries={[
            {
              query: GET_BOOK,
              variables: {
                id: book.id,
              },
            },
          ]}
        >
          {(updateBook, { data, loading, error }) => { // eslint-disable-line no-unused-vars
            const button = (
              <SaveButton
                onClick={() => toggleChange(updateBook, toggleEdit, edit)}
              >
                Save
              </SaveButton>
            );
            if (error) {
              return (
                <div>
                  <ErrorMessage error={error} />
                  { button }
                </div>
              );
            }

            return button;
          }}
        </Mutation>
      )
  );
}

UpdateBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    yearPublished: PropTypes.string,
    yearRead: PropTypes.string,
  }).isRequired,
  edit: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

export default UpdateBook;

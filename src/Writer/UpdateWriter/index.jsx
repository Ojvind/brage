import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import SaveButton from '../../Shared/Button/SaveButton';
import EditButton from '../../Shared/Button/EditButton';

import { UPDATE_WRITER } from '../mutations';
import { GET_WRITER } from '../queries';
import ErrorMessage from '../../Error';

function toggleChange(updateWriter, toggleEdit, edit) {
  updateWriter();
  toggleEdit(!edit);
}

function UpdateWriter({ writer, edit, toggleEdit }) {
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
          mutation={UPDATE_WRITER}
          variables={{
            id: writer.id,
            name: writer.name,
            surname: writer.surname,
            homepage: writer.homepage,
          }}
          refetchQueries={[
            {
              query: GET_WRITER,
              variables: {
                id: writer.id,
              },
            },
          ]}
        >
          {(updateWriter, { data, loading, error }) => { // eslint-disable-line no-unused-vars
            const button = (
              <SaveButton
                onClick={() => toggleChange(updateWriter, toggleEdit, edit)}
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

UpdateWriter.propTypes = {
  writer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    homepage: PropTypes.string,
  }).isRequired,
  edit: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

export default UpdateWriter;

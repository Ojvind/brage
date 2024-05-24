import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { CREATE_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';

import Input from '../../Shared/Input';
import Label from '../../Shared/Label';
import SaveButton from '../../Shared/Button/SaveButton';
import ErrorMessage from '../../Error';

const CreateBook = (props) => {
  const { writerId } = props;

  const [title, onTitleChange] = useState('');
  const [url, onUrlChange] = useState('');
  const [yearPublished, onYearPublishedChange] = useState('');
  const [yearRead, onReadChange] = useState('');
  const [description, onDecriptionChange] = useState('');

  return (
    <div>
      <Label variant="h4">
        Nuovo libro
      </Label>
      <div className="create-book">
        <div className="create-book__input">
          <Input onChange={(e) => onTitleChange(e.target.value)} id="titolo" inputLabel="Titolo" />
        </div>
        <div className="create-book__input">
          <Input onChange={(e) => onUrlChange(e.target.value)} id="url" inputLabel="Url" />
        </div>
        <div className="create-book__input">
          <Input onChange={(e) => onYearPublishedChange(e.target.value)} id="anno_di_pubblicazione" inputLabel="Anno di pubblicazione" />
        </div>
        <div className="create-book__input">
          <Input onChange={(e) => onReadChange(e.target.value)} id="ho_letto_il_libro_nel" inputLabel="Ho letto il libro nel" />
        </div>
        <div className="create-book__input">
          <Input onChange={(e) => onDecriptionChange(e.target.value)} id="descrizione" inputLabel="Descrizione" />
        </div>
        <Mutation
          mutation={CREATE_BOOK}
          variables={{
            writerId, title, url, yearPublished, yearRead, description,
          }}
          refetchQueries={[
            {
              query: GET_BOOKS,
              variables: { writerId },
            },
          ]}
        >
          {(createbook, { data, loading, error }) => { // eslint-disable-line no-unused-vars
            const button = (
              <SaveButton
                onClick={createbook}
              >
                Salva
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
            return (
              <div className="create-book__button">
                {button}
              </div>
            );
          }}
        </Mutation>
      </div>
    </div>
  );
};

CreateBook.propTypes = {
  writerId: PropTypes.string.isRequired,
};

export default CreateBook;

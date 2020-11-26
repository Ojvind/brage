import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { CREATE_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';

import Input from '../../Input';
import Button from '../../Button';
import ErrorMessage from '../../Error';

const CreateBook = (props) => {
  const { writerId } = props;

  const [title, onTitleChange] = useState('');
  const [yearPublished, onYearPublishedChange] = useState('');
  const [yearRead, onReadChange] = useState('');

  return (
    <div>
      <div className="create-book">
        <div className="create-book__input">
          <Input onChange={(e) => onTitleChange(e.target.value)} id="title" inputLabel="Title" />
        </div>
        <div className="create-book__input">
          <Input onChange={(e) => onYearPublishedChange(e.target.value)} id="yearpublished" inputLabel="YearPublished" />
        </div>
        <div className="create-book__input">
          <Input onChange={(e) => onReadChange(e.target.value)} id="read" inputLabel="Read" />
        </div>
        <Mutation
          mutation={CREATE_BOOK}
          variables={{
            title, yearRead, writerId, yearPublished,
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
              <Button
                className="create-book__button"
                onClick={createbook}
                color="black"
              >
                Create Bok och lovla K
              </Button>
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
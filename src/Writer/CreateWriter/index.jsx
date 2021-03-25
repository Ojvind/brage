import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { CREATE_WRITER } from '../mutations';
import { GET_WRITERS } from '../queries';

import './create-writer.css';

import ErrorMessage from '../../Error';

function CreateWriter() {
  const [name, onNameChange] = useState('');
  const [surname, onSurnameChange] = useState('');
  const [homepage, onHomepageChange] = useState('');

  return (
    <div>
      <div className="create-writer">
        <div className="create-writer__input">
          <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel="Name" />
        </div>
        <div className="create-writer__input">
          <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel="Surname" />
        </div>
        <div className="create-writer__input">
          <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel="Homepage" />
        </div>
        <Mutation
          mutation={CREATE_WRITER}
          variables={{ name, surname, homepage }}
          refetchQueries={[
            { query: GET_WRITERS },
          ]}
        >
          {(createWriter, { data, loading, error }) => { // eslint-disable-line no-unused-vars
            const button = (
              <Button
                className="create-writer__button"
                onClick={createWriter}
                color="black"
              >
                Create Writer för faaaan
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
              <div className="create-writer__button">
                {button}
              </div>
            );
          }}
        </Mutation>
      </div>
    </div>
  );
}

export default CreateWriter;

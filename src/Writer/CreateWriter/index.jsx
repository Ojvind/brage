import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Input from '../../Shared/Input';
import SaveButton from '../../Shared/Button/SaveButton';
import { CREATE_WRITER } from '../mutations';
import { GET_WRITERS } from '../queries';

import './create-writer.css';

import ErrorMessage from '../../Error';

function CreateWriter() {
  const [name, onNameChange] = useState('');
  const [surname, onSurnameChange] = useState('');
  const [homepage, onHomepageChange] = useState('');
  const [nationality, onNationalityChange] = useState('');

  return (
    <div>
      <div className="create-writer">
        <div className="create-writer__input">
          <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel="Nome" />
        </div>
        <div className="create-writer__input">
          <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel="Cognome" />
        </div>
        <div className="create-writer__input">
          <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel="Homepage" />
        </div>
        <div className="create-writer__input">
          <Input onChange={(e) => onNationalityChange(e.target.value)} id="nationality" inputLabel="Nazionalità" />
        </div>
        <Mutation
          mutation={CREATE_WRITER}
          variables={{
            name,
            surname,
            homepage,
            nationality,
          }}
          refetchQueries={[
            { query: GET_WRITERS },
          ]}
        >
          {(createWriter, { data, loading, error }) => { // eslint-disable-line no-unused-vars
            const button = (
              <SaveButton
                onClick={createWriter}
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

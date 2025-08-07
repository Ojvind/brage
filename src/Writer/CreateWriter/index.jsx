import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Input from '../../Shared/components/Input';
import SaveButton from '../../Shared/components/SaveButton';
import { CREATE_WRITER } from '../mutations';
import { GET_WRITERS } from '../queries';

import './create-writer.css';
import ErrorMessage from '../../Error';

function CreateWriter() {
  const [name, onNameChange] = useState('');
  const [surname, onSurnameChange] = useState('');
  const [homepage, onHomepageChange] = useState('');
  const [nationality, onNationalityChange] = useState('');

  const [createWriter, { loading, error }] = useMutation(CREATE_WRITER, {
    variables: {
      name,
      surname,
      homepage,
      portraitimageurl: '',
      nationality,
    },
    refetchQueries: [
      { query: GET_WRITERS },
    ],
  });

  const handleSave = async () => {
    try {
      await createWriter();
      // Optionally reset form or show success
    } catch (e) {
      // Error will be shown by error prop
    }
  };

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
        <div className="create-writer__button">
          <SaveButton onClick={handleSave} disabled={loading}>
            Salva
          </SaveButton>
        </div>
        {error && (
          <div>
            <ErrorMessage error={error} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateWriter;

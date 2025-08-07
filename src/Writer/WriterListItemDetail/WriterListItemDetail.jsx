import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import Button from '@mui/material/Button';
import Input from '../../Shared/Input';
import Label from '../../Shared/Label';
import Link from '../../Shared/Link';
import SaveButton from '../../Shared/Button/SaveButton';
import { useImageUpload } from '../../Shared/hooks/useImageUpload';

import { UPDATE_WRITER } from '../mutations';
import { GET_WRITER } from '../queries';
import ErrorMessage from '../../Error';

function WriterListItemDetail(props) {
  const { writer } = props;

  const [edit, toggleEdit] = useState(false);
  const [name, onNameChange] = useState(writer.name);
  const [surname, onSurnameChange] = useState(writer.surname);
  const [homepage, onHomepageChange] = useState(writer.homepage);
  const [nationality, onNationalityChange] = useState(writer.nationality);

  const {
    avatarURL,
    portraitimageurl,
    fileUploadRef,
    handleImageUpload,
    uploadImageDisplay,
  } = useImageUpload(writer.portraitimageurl);

  const [updateWriter, { error: mutationError }] = useMutation(UPDATE_WRITER, {
    refetchQueries: [
      {
        query: GET_WRITER,
        variables: {
          id: writer.id,
        },
      },
    ],
  });

  return (
    <div>
      <div className="list-item-detail">
        {
          (!edit)
            ? (
              <div className="full-width">
                <div className="list-item-detail__row">
                  <div className="list-item-detail__row__column">
                    <img
                      src={avatarURL}
                      alt="Avatar"
                      width="200px"
                    />
                  </div>
                  <div className="list-item-detail__row__column">
                    <Label
                      variant="h5"
                    >
                      {`${writer.name} ${writer.surname}`}
                    </Label>
                    <span className="Footer-text">Leggi di più sull&apos;autore</span>
                    {' '}
                    <Link
                      href={writer.homepage}
                    >
                      qui
                    </Link>
                    <br />
                    <br />
                    <img
                      className="list-item-detail__icon"
                      alt={nationality}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality}.svg`}
                    />
                  </div>
                </div>
              </div>
            )
            : (
              <div className="list-item-detail__wrapper">
                <img
                  src={avatarURL}
                  alt="Avatar"
                  width="20%"
                />
                <form id="form" encType="multipart/form-data">
                  <Button
                    onClick={handleImageUpload}
                  >
                    Imposta immagine
                  </Button>
                  <input
                    type="file"
                    id="file"
                    ref={fileUploadRef}
                    onChange={uploadImageDisplay}
                    hidden
                  />
                </form>
                <br />
                <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel="Name" value={name} />
                <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel="Surname" value={surname} />
                <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel="Homepage" value={homepage} />
                <Input onChange={(e) => onNationalityChange(e.target.value)} id="nationality" inputLabel="Nationality" value={nationality} />
                <div className="list-item-detail__row list-item-detail__row__button">
                  <SaveButton
                    onClick={async () => {
                      try {
                        await updateWriter({
                          variables: {
                            id: writer.id,
                            name,
                            surname,
                            homepage,
                            portraitimageurl,
                            nationality,
                          },
                        });
                        toggleEdit(!edit);
                      } catch (e) {
                        // Error will be shown by mutationError
                      }
                    }}
                  >
                    Salva
                  </SaveButton>
                </div>
                {mutationError && (
                  <div>
                    <ErrorMessage error={mutationError} />
                  </div>
                )}
              </div>
            )
        }
      </div>
      <div>
        {
          (!edit)
            ? (
              <div>
                <Button
                  onClick={() => toggleEdit(!edit)}
                >
                  Modificare Autore
                </Button>
                <br />
              </div>
            )
            : (
              <div>
                <br />
              </div>
            )
        }
      </div>
    </div>
  );
}

WriterListItemDetail.propTypes = {
  writer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    homepage: PropTypes.string,
    nationality: PropTypes.string,
    portraitimageurl: PropTypes.string,
  }).isRequired,
};

export default WriterListItemDetail;

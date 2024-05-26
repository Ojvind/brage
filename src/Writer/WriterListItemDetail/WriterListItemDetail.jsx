import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Button from '@mui/material/Button';
import Input from '../../Shared/Input';
import Label from '../../Shared/Label';
import SaveButton from '../../Shared/Button/SaveButton';

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

  return (
    <div>
      <div className="list-item-detail">
        <Label variant="h2">En bild...</Label>
        {
          (!edit)
            ? (
              <div className="full-width">
                <div className="list-item-detail__row">
                  <div>
                    <Label
                      variant="h3"
                      isLink
                      url={homepage}
                    >
                      {`${writer.name} ${writer.surname}`}
                    </Label>
                  </div>
                  <div>
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
                <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel="Name" value={name} />
                <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel="Surname" value={surname} />
                <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel="Homepage" value={homepage} />
                <Input onChange={(e) => onNationalityChange(e.target.value)} id="nationality" inputLabel="Nationality" value={nationality} />
                <Mutation
                  mutation={UPDATE_WRITER}
                  variables={{
                    id: writer.id,
                    name,
                    surname,
                    homepage,
                    nationality,
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
                  {(updateWriter, { error }) => {
                    const saveButton = (
                      <div className="list-item-detail__button">
                        <SaveButton
                          onClick={() => {
                            updateWriter()
                              .then(() => {
                                toggleEdit(!edit);
                              })
                              .catch((e) => {
                                throw e;
                              });
                          }}
                        >
                          Save
                        </SaveButton>
                      </div>
                    );
                    if (error) {
                      return (
                        <div>
                          <ErrorMessage error={error} />
                          { saveButton }
                        </div>
                      );
                    }
                    return saveButton;
                  }}
                </Mutation>
              </div>
            )
        }
      </div>
      <div>
        <Button
          onClick={() => toggleEdit(!edit)}
        >
          Modificare Autore
        </Button>
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
  }).isRequired,
};

export default WriterListItemDetail;

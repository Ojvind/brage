import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Input from '../../Shared/Input';
import Label from '../../Shared/Label';
import EditButton from '../../Shared/Button/EditButton';
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
        <Label
          variant="h2"
        >
          {`${writer.name} ${writer.surname}`}
        </Label>
        <img
          alt={nationality}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality}.svg`}
        />
        {
          (!edit)
            ? (
              <div>
                <div className="list-item-detail__labelwrapper">
                  <Label variant="subtitle2">
                    URL:
                  </Label>
                  <div className="list-item-detail__labelwrapper__label">
                    <Label variant="body" isLink>{homepage}</Label>
                  </div>
                </div>
                <div className="list-item-detail__button">
                  <EditButton
                    onClick={() => toggleEdit(!edit)}
                  >
                    Edit
                  </EditButton>
                </div>
              </div>
            )
            : (
              <div>
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

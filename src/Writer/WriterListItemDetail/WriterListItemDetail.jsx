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

  return (
    <div>
      <div className="writer-list-item-detail">
        <Label
          variant="h2"
        >
          {`${writer.name} ${writer.surname}`}
        </Label>
        {
          (!edit)
            ? (
              <div>
                <div className="writer-list-item-detail__label">
                  <Label variant="body" isLink>{homepage}</Label>
                </div>
                <div className="writer-list-item-detail__button">
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
                <Mutation
                  mutation={UPDATE_WRITER}
                  variables={{
                    id: writer.id,
                    name,
                    surname,
                    homepage,
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
  }).isRequired,
};

export default WriterListItemDetail;

import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UPDATE_WRITER } from '../mutations';
import { GET_WRITER } from '../queries';

import ErrorMessage from '../../Error';

import Button from '../../Button';
import Input from '../../Input';
import Label from '../../Label';

function toggleChange(updateWriter, toggleEdit, edit) {
  updateWriter();
  toggleEdit(!edit);
}

function WriterListItemDetail(props) {
  const [edit, toggleEdit] = useState(false);
  const [name, onNameChange] = useState(props.writer.name);
  const [surname, onSurnameChange] = useState(props.writer.surname);
  const [homepage, onHomepageChange] = useState(props.writer.homepage);

  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  return (
    <div>
      <div>
        <Label>{props.writer.id}</Label>
        {
        (!edit)
          ? <Label>{name}</Label>
          : <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel="Name" value={name} />
      }
        {
        (!edit)
          ? <Label>{surname}</Label>
          : <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel="Surname" value={surname} />
      }
        {
        (!edit)
          ? <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a>
          : <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel="Homepage" value={homepage} />
      }
        {
          (!edit)
            ? (
              <button
                onClick={() => toggleChange(() => {}, toggleEdit, edit)}
              >
                {editIcon}
                <i className="fas fa-edit fa-2x" />
              </button>
            )
            : (
              <Mutation
                mutation={UPDATE_WRITER}
                variables={{
                  id: props.writer.id,
                  name: !name ? name : name,
                  surname: !surname ? surname : surname,
                  homepage: !homepage ? homepage : homepage,
                }}
                refetchQueries={[
                  {
                    query: GET_WRITER,
                    variables: {
                      id: props.writer.id,
                    },
                  },
                ]}
              >
                {(updateWriter, { data, loading, error }) => {
                  const button = (
                    <Button
                      className="create-writer__button"
                      onClick={() => toggleChange(updateWriter, toggleEdit, edit)}
                      color="black"
                    >
                      Updatera writer för 171111
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
                  return button;
                }}
              </Mutation>
            )
        }
      </div>
    </div>
  );
}

export default WriterListItemDetail;

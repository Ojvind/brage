import React, { useState } from 'react';
import PropTypes from 'prop-types';

import UpdateWriter from '../UpdateWriter';

import Input from '../../Input';
import Label from '../../Shared/Label';

function WriterListItemDetail(props) {
  const { writer } = props;

  const [edit, toggleEdit] = useState(false);
  const [name, onNameChange] = useState(writer.name);
  const [surname, onSurnameChange] = useState(writer.surname);
  const [homepage, onHomepageChange] = useState(writer.homepage);

  return (
    <div>
      <div className="writer-list-item-detail">
        <Label variant="h2">
          {`${writer.name} ${writer.surname}`}
        </Label>
        {
          (!edit)
            ? (
              <div className="writer-list-item-detail__label">
                <Label variant="body" isLink>{homepage}</Label>
              </div>
            )
            : (
              <div>
                <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel="Name" value={name} />
                <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel="Surname" value={surname} />
                <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel="Homepage" value={homepage} />
              </div>
            )
        }

        <div className="writer-list-item-detail__button">
          <UpdateWriter
            writer={{
              id: writer.id,
              name,
              surname,
              homepage,
            }}
            edit={edit}
            toggleEdit={toggleEdit}
          />
        </div>
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

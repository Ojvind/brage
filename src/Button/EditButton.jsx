import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';

import BaseButton from './index';

const EditButton = ({
  children,
  onClick,
}) => (
  <BaseButton
    onClick={onClick}
    startIcon={<EditIcon />}
  >
    {children}
  </BaseButton>
);

EditButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EditButton;

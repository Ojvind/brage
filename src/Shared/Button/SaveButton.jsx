import React from 'react';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';

import BaseButton from './index';

const SaveButton = ({
  onClick,
  children,
}) => (
  <BaseButton
    onClick={onClick}
    startIcon={<SaveIcon />}
  >
    {children}
  </BaseButton>
);

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default SaveButton;

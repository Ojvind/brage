import React from 'react';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';

import BaseButton from './index';

const SaveButton = ({
  children,
  onClick,
}) => (
  <BaseButton
    onClick={onClick}
    startIcon={<SaveIcon />}
  >
    {children}
  </BaseButton>
);

SaveButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SaveButton;

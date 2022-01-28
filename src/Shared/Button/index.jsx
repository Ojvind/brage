import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

const BaseButton = ({
  children,
  onClick,
  ...rest // eslint-disable-line react/jsx-props-no-spreading
}) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    {...rest} // eslint-disable-line react/jsx-props-no-spreading
  >
    {children}
  </Button>
);

BaseButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BaseButton;

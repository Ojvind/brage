import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const Input = ({
  id,
  name,
  inputLabel,
  // validated,
  // valid,
  multiline,
  // shouldCustomValidate,
  // customValid,
  ...rest // eslint-disable-line react/jsx-props-no-spreading
}) => (
  <>
    {!multiline && (
      <TextField
        id="outlined-basic"
        label={inputLabel}
        variant="outlined"
        sx={{ m: 1, width: '100%' }}
        {...rest} // eslint-disable-line react/jsx-props-no-spreading
      >
        {name}
      </TextField>
    )}
    {multiline && (
      <TextField
        multiline
        maxRows={4}
        id="outlined-basic"
        label={inputLabel}
        variant="outlined"
        sx={{ m: 1, width: '100%' }}
        {...rest} // eslint-disable-line react/jsx-props-no-spreading
      >
        {name}
      </TextField>
    )}
  </>
);

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  inputLabel: PropTypes.string,
  // validated: PropTypes.bool,
  // valid: PropTypes.bool,
  multiline: PropTypes.bool,
  // shouldCustomValidate: PropTypes.bool,
  // customValid: PropTypes.bool,
};

Input.defaultProps = {
  id: null,
  name: null,
  inputLabel: '',
  // validated: false,
  // valid: null,
  multiline: false,
  // shouldCustomValidate: false,
  // customValid: undefined,
};

export default Input;

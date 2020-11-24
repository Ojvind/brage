import React from 'react';
import PropTypes from 'prop-types';

const Label = ({
  children, className, inputId, color = 'black',
}) => (
  <label
    className={`${className} Label Label_${color}`}
    htmlFor={inputId}
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Label.defaultProps = {
  color: 'black',
  className: '',
};

export default Label;

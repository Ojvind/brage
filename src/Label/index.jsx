import React from 'react';
import PropTypes from 'prop-types';

const Label = ({
  children, className, color = 'black',
}) => (
  <label
    className={`${className} Label Label_${color}`}
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

Label.defaultProps = {
  color: 'black',
  className: '',
};

export default Label;

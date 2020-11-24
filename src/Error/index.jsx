import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => (
  <div className="ErrorMessage">
    <small>{error.toString()}</small>
  </div>
);

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: '',
};

export default ErrorMessage;

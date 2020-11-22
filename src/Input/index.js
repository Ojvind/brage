import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  inputLabel,
  validated,
  valid,
  shouldCustomValidate,
  customValid,
  className,
  whitelist,
  onClick,
  ...rest
}) => {
  const inputId = id || `input--${name || ''}--${inputLabel.replace(/\s/, '-')}`;
  const localValid = shouldCustomValidate ? customValid : valid;

  return (
    <>
      <div
        className={`
          c-field
          ${validated ? 'c-field--validated' : ''}
          ${validated && localValid === true ? 'c-field--valid' : ''}
          ${validated && localValid === false ? 'c-field--invalid' : ''}
        `}
      >
        <label htmlFor={inputId}>
          {inputLabel && (
            <div className="c-field__label-text">
              {inputLabel}
            </div>
          )}
          <div className="c-field__input-wrapper">
            <input
              id={inputId}
              name={name}
              className="c-field__input"
              data-hj-whitelist={whitelist || null}
              {...rest}
            />

            {validated && (
              <div className={`
                c-input-with-button__suffix-icon
                c-input-with-button__icon
                c-input-with-button__icon--small
                ${localValid === true ? 'c-input-with-button__icon--valid' : ''}
                ${localValid === false ? 'c-input-with-button__icon--invalid' : ''}
              `}
              />
            )}
          </div>
        </label>
      </div>
    </>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  inputLabel: PropTypes.string,
  validated: PropTypes.bool,
  valid: PropTypes.bool,
  shouldCustomValidate: PropTypes.bool,
  customValid: PropTypes.bool,
  className: PropTypes.string,
  whitelist: PropTypes.bool,
  onClick: PropTypes.func,
};

Input.defaultProps = {
  id: null,
  name: null,
  inputLabel: '',
  validated: false,
  valid: null,
  shouldCustomValidate: false,
  customValid: undefined,
  className: '',
  whitelist: false,
};

export default Input;

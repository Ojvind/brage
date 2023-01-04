import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  inputLabel,
  validated,
  valid,
  textarea,
  shouldCustomValidate,
  customValid,
  ...rest // eslint-disable-line react/jsx-props-no-spreading
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
          {textarea && (
            <div className="c-field__input-wrapper c-field__input-wrapper--textarea">
              <textarea
                id={inputId}
                name={name}
                rows="4"
                cols="50"
                className="c-field__input"
                {...rest} // eslint-disable-line react/jsx-props-no-spreading
              />
            </div>
          )}
          {!textarea && (
            <div className="c-field__input-wrapper">
              {textarea && (
                <textarea
                  id={inputId}
                  name={name}
                  rows="4"
                  cols="50"
                  className="c-field__input"
                  {...rest} // eslint-disable-line react/jsx-props-no-spreading
                />
              )}
              {!textarea && (
                <input
                  id={inputId}
                  name={name}
                  className="c-field__input"
                  {...rest} // eslint-disable-line react/jsx-props-no-spreading
                />
              )}
            </div>
          )}
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
  textarea: PropTypes.bool,
  shouldCustomValidate: PropTypes.bool,
  customValid: PropTypes.bool,
};

Input.defaultProps = {
  id: null,
  name: null,
  inputLabel: '',
  validated: false,
  valid: null,
  textarea: false,
  shouldCustomValidate: false,
  customValid: undefined,
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  className,
  color = 'red',
  ...props // eslint-disable-line react/jsx-props-no-spreading
}) => (
  <div>
    <button
      className={`${className} Button Button_${color}`}
      type="button"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </button>
  </div>
);

const ButtonUnobtrusive = ({
  children,
  className,
  ...props
}) => (
  <button
    className={`${className} Button_unobtrusive`}
    type="button"
    {...props} // eslint-disable-line react/jsx-props-no-spreading
  >
    {children}
  </button>
);

const propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
};

const defaultProps = {
  children: '',
  className: 'Button_unobtrusive',
  color: 'red',
  type: 'button',
};

ButtonUnobtrusive.propTypes = propTypes;
ButtonUnobtrusive.defaultProps = defaultProps;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export { ButtonUnobtrusive };
export default Button;

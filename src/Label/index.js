import React from 'react';
import './style.css';

const Label = ({
  children,
  className,
  inputId,
  color = 'red',
  ...props
}) => (
  <label
    className={`${className} Label Label_${color}`}
    htmlFor={inputId}
    {...props}
  >
    {children}
  </label>
);

export default Label;
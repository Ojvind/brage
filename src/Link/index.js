import React from 'react';

const Link = ({ newWindow, children, ...props }) => {
  if (newWindow) {
    return (
      <a {...props} target="_blank  " rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <a {...props} target="_self">
      {children}
    </a>
  );
};

export default Link;

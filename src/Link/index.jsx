import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Link = ({
  newWindow = true, children, className, href, toolTip,
}) => {
  let link = '';
  let klass = '';
  if (toolTip) {
    klass = `${className} tooltip`;
    link = (
      <Fragment key={toolTip}>
        {children}
        <span>{toolTip}</span>
      </Fragment>
    );
  } else {
    klass = `${className}`;
    link = (
      <span>
        {children}
      </span>
    );
  }

  if (newWindow) {
    return (
      <a href={href} className={klass} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    );
  }
  return (
    <a href={href} className={klass} target="_self">
      {link}
    </a>
  );
};

Link.propTypes = {
  newWindow: PropTypes.bool,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  toolTip: PropTypes.string,
};

Link.defaultProps = {
  newWindow: true,
  className: '',
  toolTip: '',
};

export default Link;

import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const Label = ({
  variant,
  isLink,
  children,
}) => (
  isLink ? (
    <Typography
      variant={variant}
      gutterBottom
    >
      <a href={children}>{children}</a>
    </Typography>
  ) : (
    <Typography
      variant={variant}
      gutterBottom
    >
      {children}
    </Typography>
  )
);

Label.propTypes = {
  variant: PropTypes.string,
  isLink: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Label.defaultProps = {
  variant: 'h1',
  isLink: false,
};

export default Label;

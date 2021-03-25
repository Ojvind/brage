import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

/*
=== variant ===
'h1'
| 'h2'
| 'h3'
| 'h4'
| 'h5'
| 'h6'
| 'subtitle1'
| 'subtitle2'
| 'body1'
| 'body2'
| 'caption'
| 'button'
| 'overline'
| 'srOnly'
| 'inherit'
*/

const Label = ({
  variant,
  isLink,
  children,
  ...rest // eslint-disable-line react/jsx-props-no-spreading
}) => (
  isLink ? (
    <Typography
      variant={variant}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    >
      <a
        href={children}
        rel="noopener noreferrer"
        target="_new"
      >
        {` ${children} `}
      </a>
    </Typography>
  ) : (
    <Typography
      variant={variant}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    >
      {` ${children} `}
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

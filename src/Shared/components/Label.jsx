import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { withStyles } from '@mui/styles';

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

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.elevated || '#f5f5f9',
    color: theme.palette.text.primary,
    maxWidth: 250,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
}))(Tooltip);

const Label = ({
  variant,
  isLink,
  url,
  className,
  children,
  ...rest // eslint-disable-line react/jsx-props-no-spreading
}) => {
  if (isLink) {
    return (
      <Typography
        variant={variant}
        {...rest} // eslint-disable-line react/jsx-props-no-spreading
      >
        <HtmlTooltip
          title={(
            <>
              <Typography color="inherit">
                {url}
              </Typography>
              <em>opens in a new</em>
              <b> tab...</b>
            </>
          )}
          placement="top"
          arrow
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={url}
          >
            {children}
          </a>
        </HtmlTooltip>
      </Typography>
    );
  }
  return (
    <Typography
      variant={variant}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    >
      {` ${children} `}
    </Typography>
  );
};

Label.propTypes = {
  variant: PropTypes.string,
  isLink: PropTypes.bool,
  url: PropTypes.string.isRequired,
  toolTip: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Label.defaultProps = {
  variant: 'h1',
  isLink: false,
  toolTip: '',
  className: '',
};

export default Label;

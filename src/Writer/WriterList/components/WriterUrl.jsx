import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const WriterUrl = ({ params }) => (
  <HtmlTooltip
    title={(
      <>
        <Typography color="inherit">{params.value}</Typography>
        <em>opens in a new</em>
        <b> tab...</b>
      </>
    )}
    placement="top"
    arrow
  >
    <a
      target="_new"
      href={params.value}
    >
      {params.value}
    </a>
  </HtmlTooltip>
);

WriterUrl.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default WriterUrl;

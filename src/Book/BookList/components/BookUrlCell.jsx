import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const BookUrlCell = ({ params }) => (
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
    <a target="_new" href={params.value} rel="noopener noreferrer">
      {params.value.substring(0, 25)}
      ...
    </a>
  </HtmlTooltip>
);

BookUrlCell.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookUrlCell;

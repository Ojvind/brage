import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const WriterLink = ({ params }) => (
  <Tooltip
    title={params.row.id}
    placement="top"
    arrow
  >
    <Link
      to={`/writer/${params.row.id}/${params.row.name}/${params.row.surname}`}
    >
      {params.value.substring(0, 5)}
      ...
    </Link>
  </Tooltip>
);

WriterLink.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default WriterLink;

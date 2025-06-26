import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import DeleteWriterMutation from '../../DeleteWriter';
import DefaultImage from '../../../assets/upload-photo-here.png';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    renderCell: (params) => (
      <Tooltip title={params.row.id} placement="top" arrow>
        <Link to={`/writer/${params.row.id}/${params.row.name}/${params.row.surname}`}>
          {params.value.substring(0, 5)}
          ...
        </Link>
      </Tooltip>
    ),
  },
  {
    field: 'fullName',
    headerName: 'Nome e cognome',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) => `${params.row.name || ''} ${params.row.surname || ''}`,
  },
  {
    field: 'homepage',
    headerName: 'Pagina iniziale',
    width: 450,
    renderCell: (params) => (
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
          {params.value}
        </a>
      </HtmlTooltip>
    ),
  },
  {
    field: 'portraitimageurl',
    headerName: 'Ritratto',
    width: 450,
    renderCell: (params) => (
      <div>
        <img
          src={params.value ? params.value : DefaultImage}
          alt="Avatar"
          width="75px"
        />
      </div>
    ),
  },
  {
    field: 'nationality',
    headerName: 'Nazionalità',
    width: 100,
    renderCell: (params) => <div>{params.row.nationality}</div>,
  },
  {
    field: 'delete',
    headerName: ' ',
    width: 100,
    renderCell: (params) => <DeleteWriterMutation writerId={`${params.row.id}`} />,
  },
];

export default columns;

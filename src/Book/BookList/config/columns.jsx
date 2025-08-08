import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import BookImageCell from '../components/BookImageCell';
import BookUrlCell from '../components/BookUrlCell';
import BookDeleteCell from '../components/BookDeleteCell';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    renderCell: (params) => (
      <Tooltip title={params.row.id} placement="top" arrow>
        <Link to={`/book/${params.row.id}/${params.row.title}`}>
          {params.row.id.substring(0, 3)}
          ...
        </Link>
      </Tooltip>
    ),
  },
  { field: 'title', headerName: 'Titolo', width: 300 },
  {
    field: 'url',
    headerName: 'WWW',
    width: 100,
    renderCell: (params) => <BookUrlCell params={params} />,
  },
  { field: 'yearPublished', headerName: 'Anno di pubblicazione', width: 100 },
  { field: 'yearRead', headerName: 'Ho letto il libro nel', width: 100 },
  {
    field: 'portraitimageurl',
    headerName: 'Copertina del libro',
    width: 100,
    renderCell: (params) => <BookImageCell params={params} />,
  },
  {
    field: 'delete',
    headerName: ' ',
    width: 100,
    renderCell: (params) => <BookDeleteCell params={params} />,
  },
];

export default columns;

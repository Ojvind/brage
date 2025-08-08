import React from 'react';
import DeleteWriterMutation from '../../DeleteWriter';
import WriterPortrait from '../components/WriterPortrait';
import WriterUrl from '../components/WriterUrl';
import WriterLink from '../components/WriterLink';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 10,
    renderCell: (params) => <WriterLink params={params} />,
  },
  {
    field: 'fullName',
    headerName: 'Nome e cognome',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 400,
    valueGetter: (params) => `${params.row.name || ''} ${params.row.surname || ''}`,
  },
  {
    field: 'homepage',
    headerName: 'WWW',
    width: 100,
    renderCell: (params) => <WriterUrl params={params} />,
  },
  {
    field: 'portraitimageurl',
    headerName: 'Ritratto',
    width: 100,
    renderCell: (params) => <WriterPortrait params={params} />,
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

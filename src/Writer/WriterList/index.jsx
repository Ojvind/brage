/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { withStyles } from '@mui/styles';
import FetchMore from '../../FetchMore';
import DeleteWriterMutation from '../DeleteWriter';
import DefaultImage from '../../assets/upload-photo-here.png';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    writers: {
      ...previousResult.writers,
      ...fetchMoreResult.writers,
      edges: [
        ...previousResult.writers.edges,
        ...fetchMoreResult.writers.edges,
      ],
    },
  };
};

const getWriterRoute = (params) => (
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

const getWriterUrl = (params) => (
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

const getPortraitImageUrl = (params) => (
  <div>
    <img
      src={params.value ? params.value : DefaultImage}
      alt="Avatar"
      width="75px"
    />
  </div>
);

const getWriterNationality = (params) => (
  <div>
    {params.row.nationality}
  </div>
);

const getDeleteWriterMutation = (params) => (
  <DeleteWriterMutation
    writerId={`${params.row.id}`}
  />
);

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    renderCell: getWriterRoute,
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
    renderCell: getWriterUrl,
  },
  {
    field: 'portraitimageurl',
    headerName: 'Ritratto',
    width: 450,
    renderCell: getPortraitImageUrl,
  },
  {
    field: 'nationality',
    headerName: 'Nazionalità',
    width: 100,
    renderCell: getWriterNationality,
  },
  {
    field: 'delete',
    headerName: ' ',
    width: 100,
    renderCell: getDeleteWriterMutation,
  },
];

const WriterList = ({
  writers, loading, fetchMore,
}) => (
  <div className="writer-list">
    <DataGrid
      className="writer-list__datagrid"
      rows={writers.edges}
      columns={columns}
      pageSize={100}
      rowsPerPageOptions={[50]}
      // checkboxSelection
      disableSelectionOnClick
    />
    <div>
      <FetchMore
        loading={loading}
        hasNextPage={writers.pageInfo.hasNextPage}
        variables={{
          cursor: writers.pageInfo.endCursor,
        }}
        updateQuery={updateQuery}
        fetchMore={fetchMore}
      >
        Writer
      </FetchMore>
    </div>
  </div>
);

WriterList.propTypes = {
  writers: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      homepage: PropTypes.string,
      portraitimageurl: PropTypes.string,
      nationality: PropTypes.string,
    })),
    pageInfo: PropTypes.PropTypes.shape({
      hasNextPage: PropTypes.bool,
      endCursor: PropTypes.string,
    }),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default WriterList;

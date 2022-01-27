/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import Tooltip from '@material-ui/core/Tooltip';

import FetchMore from '../../FetchMore';
import DeleteWriterMutation from '../DeleteWriter';

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

const columns = [
  {
    field: 'whatever',
    headerName: 'ID',
    width: 150,
    renderCell: (params) => (
      <Tooltip
        title={params.row.id}
        placement="top"
        arrow
      >
        <Link
          to={`/writer/${params.row.id}/${params.row.name}/${params.row.surname}`}
        >
          {params.row.id.substring(0, 5)}
          ...
        </Link>
      </Tooltip>
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.name || ''} ${params.row.surname || ''}`,
  },
  {
    field: 'homepage',
    headerName: 'Web',
    width: 210,
    editable: true,
  },
  {
    field: 'delete',
    headerName: ' ',
    width: 190,
    renderCell: (params) => (
      <DeleteWriterMutation
        writerId={`${params.row.idid}`}
      />
    ),
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
      pageSize={5}
      rowsPerPageOptions={[5]}
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

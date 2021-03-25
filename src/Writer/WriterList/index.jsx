import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import Tooltip from '@material-ui/core/Tooltip';

import FetchMore from '../../FetchMore';
import DeleteWriterMutation from '../DeleteWriter';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    renderCell: (params) => (
      <Tooltip
        title={params.value}
        placement="top"
        arrow
      >
        <Link
          to={`/writer/${params.getValue('id')}/${params.getValue('name')}/${params.getValue('surname')}`}
        >
          {params.value.substring(0, 3)}
          ...
        </Link>
      </Tooltip>
    ),
  },
  { field: 'name', headerName: 'First name', width: 130 },
  { field: 'surname', headerName: 'Last name', width: 130 },
  {
    field: 'homepage',
    headerName: 'Homepage',
    width: 190,
    renderCell: (params) => (
      <a
        target="_new"
        href={params.value}
      >
        {params.value}
      </a>
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.getValue('name') || ''} ${params.getValue('surname') || ''}`,
  },
  {
    field: 'delete',
    headerName: ' ',
    width: 190,
    renderCell: (params) => (
      <DeleteWriterMutation
        writerId={`${params.getValue('id')}`}
      />
    ),
  },
];

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

const WriterList = ({
  writers, loading, fetchMore,
}) => (
  <div className="writer-list">
    <DataGrid
      className="writer-list__datagrid"
      rows={writers.edges}
      columns={columns}
      pageSize={15}
      rowHeight={35}
      checkboxSelection
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

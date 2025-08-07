/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import FetchMore from '../../FetchMore';
import columns from './config/columns';

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

const WriterList = ({ writers, loading, fetchMore }) => (
  <div className="writer-list">
    <DataGrid
      className="writer-list__datagrid"
      rows={writers.edges}
      columns={columns}
      pageSize={100}
      rowsPerPageOptions={[50, 100]}
      disableSelectionOnClick
    />
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
);

WriterList.propTypes = {
  writers: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      surname: PropTypes.string,
      homepage: PropTypes.string,
      portraitimageurl: PropTypes.string,
      nationality: PropTypes.string,
    })).isRequired,
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired,
      endCursor: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default WriterList;

import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import FetchMore from '../../FetchMore';

const EntityList = ({
  entities,
  loading,
  fetchMore,
  columns,
  entityName,
  className,
  pageSize = 100,
  rowsPerPageOptions = [50, 100],
  checkboxSelection = false,
  disableSelectionOnClick = false,
  children,
}) => {
  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    return {
      ...previousResult,
      [entityName]: {
        ...previousResult[entityName],
        ...fetchMoreResult[entityName],
        edges: [
          ...previousResult[entityName].edges,
          ...fetchMoreResult[entityName].edges,
        ],
      },
    };
  };

  return (
    <div className={className}>
      <DataGrid
        className={`${className}__datagrid`}
        rows={entities.edges}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={disableSelectionOnClick}
      />
      <FetchMore
        loading={loading}
        hasNextPage={entities.pageInfo.hasNextPage}
        variables={{
          cursor: entities.pageInfo.endCursor,
        }}
        updateQuery={updateQuery}
        fetchMore={fetchMore}
      >
        {children}
      </FetchMore>
    </div>
  );
};

EntityList.propTypes = {
  entities: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired,
      endCursor: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    headerName: PropTypes.string,
    width: PropTypes.number,
    renderCell: PropTypes.func,
  })).isRequired,
  entityName: PropTypes.string.isRequired,
  className: PropTypes.string,
  pageSize: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  checkboxSelection: PropTypes.bool,
  disableSelectionOnClick: PropTypes.bool,
  children: PropTypes.node,
};

EntityList.defaultProps = {
  className: '',
  pageSize: 100,
  rowsPerPageOptions: [50, 100],
  checkboxSelection: false,
  disableSelectionOnClick: false,
  children: null,
};

export default EntityList;

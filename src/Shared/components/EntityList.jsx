import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import FetchMore from '../../FetchMore';

const EntityList = ({
  entities,
  loading,
  fetchMore,
  columns,
  entityName,
  className,
  pageSize,
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

  // Compute height: keep writer-list fixed; book-list adapts to row count
  const getDataGridHeight = () => {
    if (className === 'writer-list') {
      return '60em';
    }
    if (className === 'book-list') {
      const rowCount = Array.isArray(entities?.edges) ? entities.edges.length : 0;
      return rowCount > 12 ? '60em' : 'auto';
    }
    return 'auto';
  };

  const dataGridHeight = getDataGridHeight();
  const useAutoHeight = dataGridHeight === 'auto';

  return (
    <div className={className}>
      {useAutoHeight ? (
        <DataGrid
          className={`${className}__datagrid`}
          rows={entities.edges}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          checkboxSelection={checkboxSelection}
          disableSelectionOnClick={disableSelectionOnClick}
          autoHeight
        />
      ) : (
        <Box
          sx={{
            height: dataGridHeight,
            '& .MuiDataGrid-root': {
              height: '100%',
            },
          }}
        >
          <DataGrid
            className={`${className}__datagrid`}
            rows={entities.edges}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
            checkboxSelection={checkboxSelection}
            disableSelectionOnClick={disableSelectionOnClick}
            autoHeight={false}
          />
        </Box>
      )}
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

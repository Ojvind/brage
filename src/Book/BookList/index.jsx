import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FetchMore from '../../FetchMore';
import { DataGrid } from '@material-ui/data-grid';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteBookMutation from '../DeleteBook';

const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 70,
    renderCell: (params) => (
      <Tooltip title={params.value} placement="top-start">
        <Link 
          to={`/book/${params.getValue('id')}/${params.getValue('title')}`}
        >
          {params.value.substring(0, 3)}...
        </Link>
      </Tooltip>
    ), 
  },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'yearPublished', headerName: 'Published (year)', width: 130 },
  { field: 'yearRead', headerName: 'Read (year)', width: 130 },
  { 
    field: 'delete',
    headerName: ' ', 
    width: 190,
    renderCell: (params) => (
      <DeleteBookMutation
        bookId={`${params.getValue('id')}`}
        writerId={`${params.getValue('writer').id}`}
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
    books: {
      ...previousResult.books,
      ...fetchMoreResult.books,
      edges: [
        ...previousResult.books.edges,
        ...fetchMoreResult.books.edges,
      ],
    },
  };
};

const BookList = ({
  match,
  books,
  loading,
  fetchMore,
  writerId,
}) => (
  <div>    
    <DataGrid className="book-list__datagrid" rows={books.edges} columns={columns} pageSize={10} checkboxSelection />
    <FetchMore
      loading={loading}
      hasNextPage={books.pageInfo.hasNextPage}
      variables={{
        cursor: books.pageInfo.endCursor,
      }}
      updateQuery={updateQuery}
      fetchMore={fetchMore}
    >
      Boooooks
    </FetchMore>
  </div>
);

BookList.propTypes = {
  books: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({})),
    pageInfo: PropTypes.PropTypes.shape({
      hasNextPage: PropTypes.bool,
      endCursor: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default BookList;

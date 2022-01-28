/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip';

import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import FetchMore from '../../FetchMore';
import DeleteBookMutation from '../DeleteBook';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    renderCell: (params) => (
      <Tooltip
        title={params.value}
        placement="top"
        arrow
      >
        <Link
          to={`/book/${params.getValue('id')}/${params.getValue('title')}`}
        >
          {params.value.substring(0, 3)}
          ...
        </Link>
      </Tooltip>
    ),
  },
  { field: 'title', headerName: 'Title', width: 250 },
  {
    field: 'url',
    headerName: 'url',
    width: 250,
    renderCell: (params) => (
      <HtmlTooltip
        title={(
          <>
            <Typography color="inherit">{params.value}</Typography>
            <em>opens in a new</em>
            <b> tab...</b>
            <u>amazing content. </u>
            It&apos;s very engaging. Right?
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
    ),
  },
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
  books,
  loading,
  fetchMore,
}) => (
  <div>
    <DataGrid
      className="book-list__datagrid"
      rowHeight={35}
      rows={books.edges}
      columns={columns}
      pageSize={10}
      checkboxSelection
    />
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

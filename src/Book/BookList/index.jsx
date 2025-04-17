/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';

import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import FetchMore from '../../FetchMore';
import DeleteBookMutation from '../DeleteBook';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const getPortraitImageUrl = (params) => (
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

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    renderCell: (params) => (
      <Tooltip
        title={params.row.id}
        placement="top"
        arrow
      >
        <Link
          to={`/book/${params.row.id}/${params.row.title}`}
        >
          {params.row.id.substring(0, 3)}
          ...
        </Link>
      </Tooltip>
    ),
  },
  { field: 'title', headerName: 'Titolo', width: 200 },
  {
    field: 'url',
    headerName: 'URL',
    width: 200,
    renderCell: (params) => (
      <HtmlTooltip
        title={(
          <>
            <Typography color="inherit">
              {params.value}
            </Typography>
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
          {params.value.substring(0, 25)}
          ...
        </a>
      </HtmlTooltip>
    ),
  },
  { field: 'yearPublished', headerName: 'Anno di pubblicazione', width: 150 },
  { field: 'yearRead', headerName: 'Ho letto il libro nel', width: 150 },
  {
    field: 'portraitimageurl',
    headerName: 'portraitimageurl',
    width: 450,
    renderCell: getPortraitImageUrl,
  },

  {
    field: 'delete',
    headerName: ' ',
    width: 190,
    renderCell: (params) => (
      <DeleteBookMutation
        bookId={`${params.row.id}`}
        writerId={`${params.row.writer.id}`}
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
      pageSize={100}
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
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default BookList;

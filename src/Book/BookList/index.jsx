/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import EntityList from '../../Shared/components/EntityList';
import columns from './config/columns';

const BookList = ({ books, loading, fetchMore }) => (
  <EntityList
    entities={books}
    loading={loading}
    fetchMore={fetchMore}
    columns={columns}
    entityName="books"
    className="book-list"
    pageSize={100}
  >
    Books
  </EntityList>
);

BookList.propTypes = {
  books: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({})),
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool,
      endCursor: PropTypes.string,
    }),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default BookList;

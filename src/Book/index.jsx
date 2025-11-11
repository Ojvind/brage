import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import BookList from './BookList';
import { GET_BOOKS } from './queries';

import Loading from '../Shared/components/Loading';
import ErrorMessage from '../Error';

const BookContainer = ({ writerId }) => {
  const {
    data, loading, error, fetchMore,
  } = useQuery(GET_BOOKS, {
    variables: { writerId },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <BookList
        books={data.books}
        loading={loading}
        fetchMore={fetchMore}
        compact
      />
    </div>
  );
};

BookContainer.propTypes = {
  writerId: PropTypes.string.isRequired,
};

export default BookContainer;

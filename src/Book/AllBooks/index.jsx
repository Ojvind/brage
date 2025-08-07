import React from 'react';
import { useQuery } from '@apollo/client';

import BookList from '../BookList';

import { GET_ALL_BOOKS } from '../queries';

import Loading from '../../Shared/Loading';
import ErrorMessage from '../../Error';

const AllBooksContainer = () => {
  const {
    data, loading, error, fetchMore,
  } = useQuery(GET_ALL_BOOKS, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <div className="app-content_small-header">
      <h1>Libri</h1>
      <BookList
        books={data.allBooks}
        loading={loading}
        fetchMore={fetchMore}
      />
    </div>
  );
};

export default AllBooksContainer;

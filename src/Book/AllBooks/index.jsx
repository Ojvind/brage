import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import BookList from '../BookList';

import { GET_ALL_BOOKS } from '../queries';

import Loading from '../../Shared/components/Loading';
import ErrorMessage from '../../Error';

const AllBooksContainer = () => {
  const {
    data, loading, error, fetchMore,
  } = useQuery(GET_ALL_BOOKS, {
    notifyOnNetworkStatusChange: true,
  });

  // Automatically load all books to make them searchable
  useEffect(() => {
    if (data?.allBooks?.pageInfo?.hasNextPage && !loading) {
      const updateQuery = (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          ...previousResult,
          allBooks: {
            ...previousResult.allBooks,
            ...fetchMoreResult.allBooks,
            edges: [
              ...previousResult.allBooks.edges,
              ...fetchMoreResult.allBooks.edges,
            ],
          },
        };
      };

      fetchMore({
        variables: {
          cursor: data.allBooks.pageInfo.endCursor,
        },
        updateQuery,
      });
    }
  }, [data?.allBooks?.pageInfo?.hasNextPage,
    data?.allBooks?.pageInfo?.endCursor,
    loading,
    fetchMore]);

  if (loading && !data) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data) {
    return <Loading />;
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

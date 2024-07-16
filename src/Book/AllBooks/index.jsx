import React from 'react';
import { Query } from 'react-apollo';

import BookList from '../BookList';

import { GET_ALL_BOOKS } from '../queries';

import Loading from '../../Shared/Loading';
import ErrorMessage from '../../Error';

const AllBooksContainer = () => (
  <Query
    query={GET_ALL_BOOKS}
    notifyOnNetworkStatusChange
  >
    {({
      loading, error, data, fetchMore,
    }) => {
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
    }}
  </Query>
);

export default AllBooksContainer;

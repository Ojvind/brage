import React from 'react';
import { Query } from 'react-apollo';
import BookList from './BookList';
import { GET_BOOKS } from './queries';

import Loading from '../Loading';
import ErrorMessage from '../Error';

const BookContainer = ({ match, location, writerId }) => (
  <Query
    query={GET_BOOKS}
    variables={{ writerId }}
    notifyOnNetworkStatusChange
  >
    {({
      data, loading, error, fetchMore,
    }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { viewer } = data;

      if (loading && !viewer) {
        return <Loading />;
      }

      return (
        <div>
          <BookList
            match={match}
            location={location}
            books={data.books}
            loading={loading}
            fetchMore={fetchMore}
          />
        </div>
      );
    }}
  </Query>
);

export default BookContainer;

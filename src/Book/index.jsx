import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import BookList from './BookList';
import { GET_BOOKS } from './queries';

import Loading from '../Shared/Loading';
import ErrorMessage from '../Error';

const BookContainer = ({ writerId }) => (
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

      if (loading) {
        return <Loading />;
      }

      return (
        <div>
          <BookList
            books={data.books}
            loading={loading}
            fetchMore={fetchMore}
          />
        </div>
      );
    }}
  </Query>
);

BookContainer.propTypes = {
  writerId: PropTypes.string.isRequired,
};

export default BookContainer;

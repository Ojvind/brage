import React from 'react';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom';

import { GET_BOOK } from '../queries';

import Loading from '../../Shared/Loading';
import ErrorMessage from '../../Error';
import BookListItemDetail from './bookListItemDetail';

const BookListItemDetailContainter = () => {
  const { id } = useParams();
  return (
    <div>
      <Query
        query={GET_BOOK}
        notifyOnNetworkStatusChange
        variables={{
          id,
        }}
      >
        {({
          data, loading, error,
        }) => {
          if (error) {
            return <ErrorMessage error={error} />;
          }
          if (loading) {
            return <Loading />;
          }
          return (
            <BookListItemDetail
              book={data.book}
            />
          );
        }}
      </Query>
    </div>
  );
};

export default BookListItemDetailContainter;

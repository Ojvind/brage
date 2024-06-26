import React from 'react';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom';

import { GET_BOOK } from '../queries';

import Loading from '../../Shared/Loading';
import ErrorMessage from '../../Error';
import BookListItemDetail from './BookListItemDetail';

const BookListItemDetailContainter = () => {
  const { bookId } = useParams();
  return (
    <div>
      <Query
        query={GET_BOOK}
        notifyOnNetworkStatusChange
        variables={{
          bookId,
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
            <div className="app-content_small-header">
              <BookListItemDetail
                book={data.book}
              />
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default BookListItemDetailContainter;

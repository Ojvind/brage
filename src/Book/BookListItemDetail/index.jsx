import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_BOOK } from '../queries';

import Loading from '../../Shared/components/Loading';
import ErrorMessage from '../../Error';
import BookListItemDetail from './BookListItemDetail';

const BookListItemDetailContainer = () => {
  const { bookId } = useParams();
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { bookId },
    notifyOnNetworkStatusChange: true,
  });

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
};

export default BookListItemDetailContainer;

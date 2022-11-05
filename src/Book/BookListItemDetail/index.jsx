import React from 'react';
import { Query } from 'react-apollo';
import { useParams, Link } from 'react-router-dom';

// import PropTypes from 'prop-types';

import { GET_BOOK } from '../queries';

import Loading from '../../Shared/Loading';
import ErrorMessage from '../../Error';
import BookListItemDetail from './bookListItemDetail';

const BookListItemDetailContainter = () => {
  const { id } = useParams();
  return (
    <div>
      wekljrklwejr
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
            <div>
              <BookListItemDetail
                book={data.book}
              />
              <h5>
                <Link to="/writers">Back to list of Writers</Link>
              </h5>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

// BookListItemDetailContainter.propTypes = {
//   match: PropTypes.shape({ params: { id: PropTypes.string } }),
// };

// BookListItemDetailContainter.defaultProps = {
//   match: {},
// };

export default BookListItemDetailContainter;

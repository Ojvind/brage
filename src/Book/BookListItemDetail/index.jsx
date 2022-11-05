import React from 'react';
// import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
// import { GET_BOOK } from '../queries';

// import Loading from '../../Shared/Loading';
// import ErrorMessage from '../../Error';
// import BookListItemDetail from './bookListItemDetail';

const BookListItemDetailContainter = (props) => {
  const { match } = props;
  return (
    <div>
      {
        match
      }
      wekljrklwejr
      {/* <Query
        query={GET_BOOK}
        notifyOnNetworkStatusChange
        variables={{
          id: match.params.id,
        }}
      >
        {({
          data, loading, error,
        }) => {
          if (error) {
            return <ErrorMessage error={error} />;
          }

          const { viewer } = data;

          if (loading && !viewer) {
            return <Loading />;
          }
          return (
            <BookListItemDetail
              book={data.book}
            />
          );
        }}
      </Query> */}
    </div>
  );
};

BookListItemDetailContainter.propTypes = {
  match: PropTypes.shape({ params: { id: PropTypes.string } }),
};

BookListItemDetailContainter.defaultProps = {
  match: {},
};

export default BookListItemDetailContainter;

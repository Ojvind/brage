import React from 'react';
import { Query } from 'react-apollo';
import { useParams, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { GET_WRITER } from '../queries';
import Loading from '../../Shared/Loading';
import ErrorMessage from '../../Error';
import BookContainer from '../../Book';
import CreateBook from '../../Book/CreateBook';
import WriterListItemDetail from './WriterListItemDetail';

const WriterListItemDetailContainer = () => {
  const { id } = useParams();
  return (
    <div>
      <Query
        query={GET_WRITER}
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
            <div className="app-content_small-header">
              <div>
                <WriterListItemDetail
                  writer={data.writer}
                />
                <BookContainer
                  writerId={data.writer.id}
                />
                <CreateBook writerId={data.writer.id} />
              </div>
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

// WriterListItemDetailContainer.propTypes = {
//   match: PropTypes.shape({ params: { id: PropTypes.string } }).isRequired,
//   location: PropTypes.shape({}).isRequired,
// };

export default WriterListItemDetailContainer;

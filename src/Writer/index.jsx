import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import WriterList from './WriterList';
import CreateWriter from './CreateWriter';

import { GET_WRITERS } from './queries';

import Loading from '../Loading';
import ErrorMessage from '../Error';

const WriterContainer = ({ match }) => (
  <Query
    query={GET_WRITERS}
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
        <div className="App-content_small-header">
          <div>
            <WriterList
              match={match}
              writers={data.writers}
              loading={loading}
              fetchMore={fetchMore}
            />
          </div>
          <div>
            <CreateWriter />
          </div>
        </div>
      );
    }}
  </Query>
);

WriterContainer.propTypes = {
  match: PropTypes.shape({}),
};

WriterContainer.defaultProps = {
  match: {},
};

export default WriterContainer;

import React from 'react';
import { Query } from 'react-apollo';
import WriterList from './WriterList';
import CreateWriter from './CreateWriter';

import { GET_WRITERS } from './queries';

import Loading from '../Loading';
import ErrorMessage from '../Error';

const WriterContainer = () => (
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
        <div className="app-content_small-header">
          <div>
            <WriterList
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

export default WriterContainer;

import React from 'react';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom';

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
              <WriterListItemDetail
                writer={data.writer}
              />
              <BookContainer
                writerId={data.writer.id}
              />
              <CreateBook writerId={data.writer.id} />
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default WriterListItemDetailContainer;

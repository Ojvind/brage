import React from 'react';
import { Query } from 'react-apollo';
import { GET_WRITER } from '../queries';

import Loading from '../../Loading';
import ErrorMessage from '../../Error';

import BookContainer from '../../Book';
import CreateBook from '../../Book/CreateBook';
import WriterListItemDetail from './WriterListItemDetail';

import { Link } from 'react-router-dom';

class WriterListItemDetailContainer extends React.Component {

  render() {
    const { match } = this.props;
    return  (
      <div>
        <Query 
          query={GET_WRITER}
          notifyOnNetworkStatusChange={true}
          variables={{
            id: match.params.id,
          }}
        >
          {({ data, loading, error, fetchMore }) => {
            if (error) {
              return <ErrorMessage error={error} />;
            }
      
            const { viewer } = data;
      
            if (loading && !viewer) {
              return <Loading />;
            }
        
            return (
              <div>
                <div className="App-content_small-header">
                <div>
                    <WriterListItemDetail
                      writer={data.writer}
                    />
                    <BookContainer 
                      writerId={data.writer.id}
                      match={match}
                    />
                    <CreateBook writerId={data.writer.id} />
                  </div>
                  <h5>
                    <Link to="/writers">Back to list of Writers</Link>
                  </h5>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default WriterListItemDetailContainer;
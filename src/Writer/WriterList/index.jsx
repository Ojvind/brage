import React from 'react';
import PropTypes from 'prop-types';

import FetchMore from '../../FetchMore';
import WriterListItem from '../WriterListItem';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    writers: {
      ...previousResult.writers,
      ...fetchMoreResult.writers,
      edges: [
        ...previousResult.writers.edges,
        ...fetchMoreResult.writers.edges,
      ],
    },
  };
};

const WriterList = ({
  match, writers, loading, fetchMore,
}) => (
  <div>
    <div>
      <div className="writer-list__headerrow">
        <div className="writer-list__name">
          Name
        </div>
        <div className="writer-list__surname">
          Familyname
        </div>
        <div className="writer-list__homepage">
          Homepage
        </div>
      </div>
      {writers.edges.map((writer) => (
        <WriterListItem
          match={match}
          writer={writer}
          key={writer.id}
        />
      ))}

      <FetchMore
        loading={loading}
        hasNextPage={writers.pageInfo.hasNextPage}
        variables={{
          cursor: writers.pageInfo.endCursor,
        }}
        updateQuery={updateQuery}
        fetchMore={fetchMore}
      >
        Writer
      </FetchMore>
    </div>
  </div>
);

WriterList.propTypes = {
  writers: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({})),
    pageInfo: PropTypes.PropTypes.shape({
      hasNextPage: PropTypes.bool,
      endCursor: PropTypes.string,
    }),
    name: PropTypes.string,
    surname: PropTypes.string,
    homepage: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default WriterList;

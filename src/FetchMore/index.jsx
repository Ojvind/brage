import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import { ButtonUnobtrusive } from '../Button';

const FetchMore = ({
  loading, hasNextPage, variables, updateQuery, fetchMore, children,
}) => (
  <div className="FetchMore">
    {loading ? (
      <Loading />
    ) : (
      hasNextPage && (
      <ButtonUnobtrusive
        className="FetchMore-button"
        onClick={() => fetchMore({ variables, updateQuery })}
      >
        More
        {' '}
        {children}
      </ButtonUnobtrusive>
      )
    )}
  </div>
);

FetchMore.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  variables: PropTypes.string.isRequired,
  updateQuery: PropTypes.string.isRequired,
  fetchMore: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
};

export default FetchMore;
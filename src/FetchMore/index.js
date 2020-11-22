import React from 'react';
import Loading from '../Loading';
import { ButtonUnobtrusive } from '../Button';
import './style.css';

const FetchMore = ({
  loading,
  hasNextPage,
  variables,
  updateQuery,
  fetchMore,
  children,
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
        Moreeeee
        {' '}
        {children}
      </ButtonUnobtrusive>
      )
    )}
  </div>
);
export default FetchMore;

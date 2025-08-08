/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import EntityList from '../../Shared/components/EntityList';
import columns from './config/columns';

const WriterList = ({ writers, loading, fetchMore }) => (
  <EntityList
    entities={writers}
    loading={loading}
    fetchMore={fetchMore}
    columns={columns}
    entityName="writers"
    className="writer-list"
    pageSize={50}
    rowsPerPageOptions={[50, 100]}
    disableSelectionOnClick
  >
    Writer
  </EntityList>
);

WriterList.propTypes = {
  writers: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      surname: PropTypes.string,
      homepage: PropTypes.string,
      portraitimageurl: PropTypes.string,
      nationality: PropTypes.string,
    })).isRequired,
    pageInfo: PropTypes.shape({
      hasNextPage: PropTypes.bool.isRequired,
      endCursor: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default WriterList;

import React from 'react';
import PropTypes from 'prop-types';
import DefaultImage from '../../../assets/upload-photo-here.png';

const WriterPortrait = ({ params }) => (
  <div>
    <img
      src={params.value || DefaultImage}
      alt="Writer portrait"
      width="75px"
    />
  </div>
);

WriterPortrait.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default WriterPortrait;

import React from 'react';
import PropTypes from 'prop-types';
import DefaultImage from '../../../assets/upload-photo-here.png';

const BookImageCell = ({ params }) => (
  <div>
    <img
      src={params.value ? params.value : DefaultImage}
      alt="Book cover"
      width="75px"
    />
  </div>
);

BookImageCell.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
};

export default BookImageCell;

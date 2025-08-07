import React from 'react';
import PropTypes from 'prop-types';
import DeleteBookMutation from '../../DeleteBook';

const BookDeleteCell = ({ params }) => (
  <DeleteBookMutation
    bookId={`${params.row.id}`}
    writerId={`${params.row.writer.id}`}
  />
);

BookDeleteCell.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.shape({
      id: PropTypes.string.isRequired,
      writer: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookDeleteCell;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookListItem = ({ book }) => (
  <div className="book-list__listrow" key={book.id}>
    <span className="book-list__title">
      {/* Maybe this is the link I really want? See below. Try to make that one work instead!! */}
      {/* <Link to={`${match.url}/${book.id}/${book.title}`}>{book.title} </Link> */}
      <Link to={`/books/${book.id}/${book.title}`}>
        {book.title}
        {' '}
      </Link>
    </span>
    <span className="book-list__yearPublished">
      {book.yearPublished}
    </span>
    <span className="book-list__yearRead">
      {book.yearRead}
    </span>
    <span className="book-list__createdAt">
      {book.createdAt}
    </span>
    <span>
      DeleteBook
    </span>
  </div>
);

BookListItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    yearRead: PropTypes.string,
    yearPublished: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default BookListItem;

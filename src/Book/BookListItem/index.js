import React from 'react';
import { Link } from 'react-router-dom';

export default function BookListItem({ book, match }) {
  return (
    <div className="book-list__listrow" key={book.id}>
      <span className="book-list__id">
        <Link to={`/books/${book.id}/${book.title}`}>
          {book.id}
          {' '}
        </Link>
      </span>
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
    </div>
  );
}

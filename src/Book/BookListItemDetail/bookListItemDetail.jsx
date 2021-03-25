import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UpdateBook from '../UpdateBook';

import Input from '../../Shared/Input';
import Label from '../../Shared/Label';

function BookListItemDetail(props) {
  const { book } = props;

  const [edit, toggleEdit] = useState(false);
  const [title, onTitleChange] = useState(book.title);
  const [url, onUrlChange] = useState(book.url);
  const [yearPublished, onYearPublishedChange] = useState(book.yearPublished);
  const [yearRead, onYearReadChange] = useState(book.yearRead);

  return (
    <div className="app-content_small-header">
      <div className="book-list-item-detail">
        <Label variant="h2">En bild...</Label>
        {
          (!edit)
            ? (
              <div>
                <Label variant="h4">{title}</Label>
                <Label variant="h4" isLink>{url}</Label>
                This book was published
                <Label variant="caption">{yearPublished}</Label>
                and I read it
                <Label variant="caption">{yearRead}</Label>
              </div>
            )
            : (
              <div>
                <Input onChange={(e) => onTitleChange(e.target.value)} inputLabel="Title" value={title} />
                <Input onChange={(e) => onUrlChange(e.target.value)} inputLabel="Url" value={url} />
                <Input onChange={(e) => onYearPublishedChange(e.target.value)} inputLabel="Published year" value={yearPublished} />
                <Input onChange={(e) => onYearReadChange(e.target.value)} inputLabel="Read year" value={yearRead} />
              </div>
            )
        }
        <div className="book-list-item-detail__button">
          <UpdateBook
            book={book}
            edit={edit}
            toggleEdit={toggleEdit}
          />
        </div>
      </div>
      <h5>
        <Link to="/writers">Back to list of Writers</Link>
      </h5>
    </div>
  );
}

BookListItemDetail.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    yearRead: PropTypes.string,
    yearPublished: PropTypes.string,
  }).isRequired,
};

export default BookListItemDetail;

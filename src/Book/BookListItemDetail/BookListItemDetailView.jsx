import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Label from '../../Shared/Label';
import DefaultImage from '../../assets/upload-photo-here.png';

function BookListItemDetailView({ book, avatarURL, description, yearPublished, yearRead, url, title }) {
  return (
    <div className="full-width">
      <div className="list-item-detail__row">
        <div className="list-item-detail__row__column">
          <img
            src={avatarURL || book.portraitimageurl || DefaultImage}
            alt="Avatar"
            width="200px"
          />
        </div>
        <div className="list-item-detail__row__column">
          <Label
            variant="h5"
            isLink
            url={url}
          >
            {title}
          </Label>
          <div>
            <Label variant="subtitle2">
              Autore:
            </Label>
            <RouterLink to={`/writer/${book.writer.id}/${book.writer.name}/${book.writer.surname}`}>
              {`${book.writer.name} ${book.writer.surname}`}
            </RouterLink>
          </div>
          <br />
          <div>
            <Label variant="subtitle2">
              Descrizione:
            </Label>
          </div>
          <div className="break" />
          <div>
            {description}
          </div>
          <br />
          <Label variant="h6">
            {` Questo libro è stato pubblicato nel ${yearPublished} e l'ho letto nel ${yearRead}`}
          </Label>
        </div>
      </div>
    </div>
  );
}

BookListItemDetailView.propTypes = {
  book: PropTypes.object.isRequired,
  avatarURL: PropTypes.string,
  description: PropTypes.string,
  yearPublished: PropTypes.string,
  yearRead: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
};

export default BookListItemDetailView;

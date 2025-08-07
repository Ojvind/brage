import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import BookListItemDetailView from './BookListItemDetailView';
import BookListItemDetailEdit from './BookListItemDetailEdit';
import { useImageUpload } from '../../Shared/hooks/useImageUpload';

function BookListItemDetail(props) {
  const { book } = props;

  const [edit, toggleEdit] = useState(false);
  const [title, onTitleChange] = useState(book.title);
  const [url, onUrlChange] = useState(book.url);
  const [yearPublished, onYearPublishedChange] = useState(book.yearPublished);
  const [yearRead, onYearReadChange] = useState(book.yearRead);
  const [description, onDescriptionChange] = useState(book.description);

  const {
    avatarURL,
    portraitimageurl,
    fileUploadRef,
    handleImageUpload,
    uploadImageDisplay,
  } = useImageUpload(book.portraitimageurl);

  return (
    <div>
      <div className="list-item-detail">
        {
          (!edit)
            ? (
              <BookListItemDetailView
                book={book}
                avatarURL={avatarURL}
                description={description}
                yearPublished={yearPublished}
                yearRead={yearRead}
                url={url}
                title={title}
              />
            )
            : (
              <BookListItemDetailEdit
                book={book}
                avatarURL={avatarURL}
                title={title}
                onTitleChange={onTitleChange}
                url={url}
                onUrlChange={onUrlChange}
                yearPublished={yearPublished}
                onYearPublishedChange={onYearPublishedChange}
                yearRead={yearRead}
                onYearReadChange={onYearReadChange}
                description={description}
                onDescriptionChange={onDescriptionChange}
                portraitimageurl={portraitimageurl}
                fileUploadRef={fileUploadRef}
                handleImageUpload={handleImageUpload}
                uploadImageDisplay={uploadImageDisplay}
                toggleEdit={toggleEdit}
                edit={edit}
              />
            )
        }
      </div>
      <div>
        {
          (!edit)
            ? (
              <Button
                onClick={() => toggleEdit(!edit)}
              >
                Modifica Libro
              </Button>
            )
            : (
              <div />
            )
        }
      </div>
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
    description: PropTypes.string,
    portraitimageurl: PropTypes.string,
    writer: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
    }),
  }).isRequired,
};

export default BookListItemDetail;

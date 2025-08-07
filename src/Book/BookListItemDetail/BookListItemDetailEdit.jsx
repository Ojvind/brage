import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import Input from '../../Shared/components/Input';
import SaveButton from '../../Shared/components/SaveButton';
import ErrorMessage from '../../Error';
import DefaultImage from '../../assets/upload-photo-here.png';
import { UPDATE_BOOK } from '../mutations';
import { GET_BOOK } from '../queries';

function BookListItemDetailEdit({
  book,
  avatarURL,
  title,
  onTitleChange,
  url,
  onUrlChange,
  yearPublished,
  onYearPublishedChange,
  yearRead,
  onYearReadChange,
  description,
  onDescriptionChange,
  portraitimageurl,
  fileUploadRef,
  handleImageUpload,
  uploadImageDisplay,
  toggleEdit,
  edit,
}) {
  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [
      {
        query: GET_BOOK,
        variables: { id: book.id },
      },
    ],
  });

  const handleSave = async () => {
    try {
      await updateBook({
        variables: {
          id: book.id,
          title,
          url,
          yearPublished,
          yearRead,
          description,
          portraitimageurl,
        },
      });
      toggleEdit(!edit);
    } catch (e) {
      // Error will be shown by error prop
    }
  };

  return (
    <div className="list-item-detail__wrapper">
      <img
        src={avatarURL || book.portraitimageurl || DefaultImage}
        alt="Avatar"
        width="20%"
      />
      <form id="form" encType="multipart/form-data">
        <Button
          onClick={handleImageUpload}
        >
          Imposta immagine
        </Button>
        <input
          type="file"
          id="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden
        />
      </form>
      <br />
      <Input onChange={(e) => onTitleChange(e.target.value)} inputLabel="Titolo" value={title} />
      <Input onChange={(e) => onUrlChange(e.target.value)} inputLabel="URL" value={url} />
      <Input onChange={(e) => onDescriptionChange(e.target.value)} inputLabel="Descrizione" multiline value={description} />
      <Input onChange={(e) => onYearPublishedChange(e.target.value)} inputLabel="Anno di pubblicazione" value={yearPublished} />
      <Input onChange={(e) => onYearReadChange(e.target.value)} inputLabel="Ho letto il libro nel" value={yearRead} />
      <div className="list-item-detail__row list-item-detail__row__button">
        <SaveButton
          onClick={handleSave}
          disabled={loading}
        >
          Salva
        </SaveButton>
      </div>
      {error && (
        <div>
          <ErrorMessage error={error} />
        </div>
      )}
    </div>
  );
}

BookListItemDetailEdit.propTypes = {
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
  avatarURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  yearPublished: PropTypes.string.isRequired,
  onYearPublishedChange: PropTypes.func.isRequired,
  yearRead: PropTypes.string.isRequired,
  onYearReadChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  portraitimageurl: PropTypes.string,
  fileUploadRef: PropTypes.shape({
    current: PropTypes.oneOfType([
      PropTypes.instanceOf(HTMLInputElement),
      PropTypes.oneOf([null]),
    ]),
  }).isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  uploadImageDisplay: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

BookListItemDetailEdit.defaultProps = {
  avatarURL: '',
  portraitimageurl: '',
};

export default BookListItemDetailEdit;

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Link as RouterLink } from 'react-router-dom';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Button from '@mui/material/Button';

import Input from '../../Shared/Input';
import Label from '../../Shared/Label';
import SaveButton from '../../Shared/Button/SaveButton';
import DefaultImage from '../../assets/upload-photo-here.png';

import { UPDATE_BOOK } from '../mutations';
import { GET_BOOK } from '../queries';
import ErrorMessage from '../../Error';

function BookListItemDetail(props) {
  const { book } = props;

  const [avatarURL, setAvatarURL] = useState(book.portraitimageurl ?? DefaultImage); // eslint-disable-line max-len
  const [edit, toggleEdit] = useState(false);
  const [title, onTitleChange] = useState(book.title);
  const [url, onUrlChange] = useState(book.url);
  const [yearPublished, onYearPublishedChange] = useState(book.yearPublished);
  const [yearRead, onYearReadChange] = useState(book.yearRead);
  const [description, onDescriptionChange] = useState(book.description);
  const [portraitimageurl, setPortraitImageUrl] = useState(book.portraitimageurl);

  const fileUploadRef = useRef();

  const minioEndpoint = 'http://localhost:9000';
  const minioUserName = 'ojvind.otterbjork';
  const minioPassword = 'Pp30s3n56dl';
  const minioBucketName = 'ojvind.otterbjork.minio';

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const s3Client = new S3Client({
    endpoint: minioEndpoint,
    region: 'eu-north-1',
    credentials: {
      accessKeyId: minioUserName,
      secretAccessKey: minioPassword,
    },
    forcePathStyle: true, // Required for MinIO
  });

  async function uploadFile(key, fileContent) {
    const command = new PutObjectCommand({
      Bucket: minioBucketName,
      Key: key,
      Body: fileContent,
    });

    try {
      const response = await s3Client.send(command);
      console.log('File uploaded successfully', response);
    } catch (err) {
      console.error('Error uploading file', err);
    }
  }

  const uploadImageDisplay = async () => {
    const uploadedFile = fileUploadRef.current.files[0];
    const cachedURL = URL.createObjectURL(uploadedFile);
    setAvatarURL(cachedURL);

    const response = await fetch(cachedURL);
    const data = await response.arrayBuffer();
    setPortraitImageUrl(`${minioEndpoint}/${minioBucketName}/${uploadedFile.name}`);

    uploadFile(uploadedFile.name, data);
  };

  return (
    <div>
      <div className="list-item-detail">
        {
          (!edit)
            ? (
              <div className="full-width">
                <div className="list-item-detail__row">
                  <div className="list-item-detail__row__column">
                    <img
                      src={avatarURL}
                      alt="Avatar"
                      width="200px"
                    />
                  </div>
                  <div className="list-item-detail__row__column">
                    <Label
                      variant="h3"
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
            )
            : (
              <div className="list-item-detail__wrapper">
                <img
                  src={avatarURL}
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
                <Mutation
                  mutation={UPDATE_BOOK}
                  variables={{
                    id: book.id,
                    title,
                    url,
                    yearPublished,
                    yearRead,
                    description,
                    portraitimageurl,
                  }}
                  refetchQueries={[
                    {
                      query: GET_BOOK,
                      variables: {
                        id: book.id,
                      },
                    },
                  ]}
                >
                  {(updateBook, { data, loading, error }) => { // eslint-disable-line no-unused-vars
                    const button = (
                      <div className="list-item-detail__row list-item-detail__row__button">
                        <SaveButton
                          onClick={() => {
                            updateBook()
                              .then(() => {
                                toggleEdit(!edit);
                              })
                              .catch((e) => {
                                throw e;
                              });
                          }}
                        >
                          Salva
                        </SaveButton>
                      </div>
                    );
                    if (error) {
                      return (
                        <div>
                          <ErrorMessage error={error} />
                          { button }
                        </div>
                      );
                    }
                    return button;
                  }}
                </Mutation>
              </div>
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
              // <Button
              //   onClick={() => toggleEdit(!edit)}
              // >
              //   Annulla
              // </Button>
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

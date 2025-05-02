import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import Button from '@mui/material/Button';
import Input from '../../Shared/Input';
import Label from '../../Shared/Label';
import Link from '../../Shared/Link';
import SaveButton from '../../Shared/Button/SaveButton';
import DefaultImage from '../../assets/upload-photo-here.png';

import { UPDATE_WRITER } from '../mutations';
import { GET_WRITER } from '../queries';
import ErrorMessage from '../../Error';

function WriterListItemDetail(props) {
  const { writer } = props;

  const [avatarURL, setAvatarURL] = useState(writer.portraitimageurl ?? DefaultImage); // eslint-disable-line max-len
  const [edit, toggleEdit] = useState(false);
  const [name, onNameChange] = useState(writer.name);
  const [surname, onSurnameChange] = useState(writer.surname);
  const [homepage, onHomepageChange] = useState(writer.homepage);
  const [nationality, onNationalityChange] = useState(writer.nationality);
  const [portraitimageurl, setPortraitImageUrl] = useState(writer.portraitimageurl);

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
                      variant="h5"
                    >
                      {`${writer.name} ${writer.surname}`}
                    </Label>
                    <span className="Footer-text">Leggi di più sull&apos;autore</span>
                    {' '}
                    <Link
                      href={writer.homepage}
                    >
                      qui
                    </Link>
                    <br />
                    <br />
                    <img
                      className="list-item-detail__icon"
                      alt={nationality}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality}.svg`}
                    />
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
                <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel="Name" value={name} />
                <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel="Surname" value={surname} />
                <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel="Homepage" value={homepage} />
                <Input onChange={(e) => onNationalityChange(e.target.value)} id="nationality" inputLabel="Nationality" value={nationality} />
                <Mutation
                  mutation={UPDATE_WRITER}
                  variables={{
                    id: writer.id,
                    name,
                    surname,
                    homepage,
                    portraitimageurl,
                    nationality,
                  }}
                  refetchQueries={[
                    {
                      query: GET_WRITER,
                      variables: {
                        id: writer.id,
                      },
                    },
                  ]}
                >
                  {(updateWriter, { error }) => {
                    const saveButton = (
                      <div className="list-item-detail__row list-item-detail__row__button">
                        <SaveButton
                          onClick={() => {
                            updateWriter()
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
                          { saveButton }
                        </div>
                      );
                    }
                    return saveButton;
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
              <div>
                <Button
                  onClick={() => toggleEdit(!edit)}
                >
                  Modificare Autore
                </Button>
                <br />
              </div>
            )
            : (
              <div>
                <br />
              </div>
            )
        }
      </div>
    </div>
  );
}

WriterListItemDetail.propTypes = {
  writer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    homepage: PropTypes.string,
    nationality: PropTypes.string,
    portraitimageurl: PropTypes.string,
  }).isRequired,
};

export default WriterListItemDetail;

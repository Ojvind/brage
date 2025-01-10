import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import fs from 'fs';

import Button from '@mui/material/Button';
import Input from '../../Shared/Input';
import Label from '../../Shared/Label';
import SaveButton from '../../Shared/Button/SaveButton';
import DefaultImage from '../../assets/upload-photo-here.png';
import EditIcon from '../../assets/edit.svg';

import { UPDATE_WRITER } from '../mutations';
import { GET_WRITER } from '../queries';
import ErrorMessage from '../../Error';

function WriterListItemDetail(props) {
  const { writer } = props;

  const [avatarURL, setAvatarURL] = useState(DefaultImage); // eslint-disable-line no-unused-vars
  const [edit, toggleEdit] = useState(false);
  const [name, onNameChange] = useState(writer.name);
  const [surname, onSurnameChange] = useState(writer.surname);
  const [homepage, onHomepageChange] = useState(writer.homepage);
  const [nationality, onNationalityChange] = useState(writer.nationality);
  const [imageurl, onImageUrlChange] = useState(writer.imageurl);

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const s3Client = new S3Client({
    endpoint: 'http://localhost:9000', // MinIO server address
    region: 'eu-north-1', // MinIO doesn't require a specific region
    credentials: {
      accessKeyId: 'ojvind.otterbjork', // Replace with your access key
      secretAccessKey: 'Pp30s3n56dl', // Replace with your secret key
    },
    forcePathStyle: true, // Required for MinIO
  });

  async function uploadFile(bucketName, key, fileContent) {
    // const fileContent = fs.readFileSync(filePath);
    const command = new PutObjectCommand({
      Bucket: bucketName,
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

    const result = `http://localhost:9000/ojvind.otterbjork.minio/${uploadedFile.name}`;

    const response = await fetch(cachedURL);
    const data = await response.arrayBuffer();
    onImageUrlChange(result);

    const bucketName = 'ojvind.otterbjork.minio';
    uploadFile(bucketName, uploadedFile.name, data);
  };

  return (
    <div>
      <div className="list-item-detail">
        {
          (!edit)
            ? (
              <div className="full-width">
                <img
                  src={avatarURL}
                  alt="Avatar"
                  width="20%"
                />

                <div className="list-item-detail__row">
                  <div>
                    <Label
                      variant="h3"
                      isLink
                      url={homepage}
                    >
                      {`${writer.name} ${writer.surname}`}
                    </Label>
                  </div>
                  <div>
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
                  <button
                    type="submit"
                    onClick={handleImageUpload}
                  >
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="object-cover"
                    />
                  </button>
                  <input
                    type="file"
                    id="file"
                    ref={fileUploadRef}
                    onChange={uploadImageDisplay}
                    hidden
                  />
                </form>

                <Input onChange={(e) => onNameChange(e.target.value)} id="name" inputLabel="Name" value={name} />
                <Input onChange={(e) => onSurnameChange(e.target.value)} id="surname" inputLabel="Surname" value={surname} />
                <Input onChange={(e) => onHomepageChange(e.target.value)} id="homepage" inputLabel="Homepage" value={homepage} />
                <Input onChange={(e) => onNationalityChange(e.target.value)} id="nationality" inputLabel="Nationality" value={nationality} />
                <Input onChange={(e) => onImageUrlChange(e.target.value)} id="imageurl" inputLabel="ImageUrl" value={imageurl} />
                <Mutation
                  mutation={UPDATE_WRITER}
                  variables={{
                    id: writer.id,
                    name,
                    surname,
                    homepage,
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
                      <div className="list-item-detail__button">
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
                          Save
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
        <Button
          onClick={() => toggleEdit(!edit)}
        >
          Modificare Autore
        </Button>
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
    imageurl: PropTypes.string,
  }).isRequired,
};

export default WriterListItemDetail;

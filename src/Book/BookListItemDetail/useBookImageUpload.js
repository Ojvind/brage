import { useRef, useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import DefaultImage from '../../assets/upload-photo-here.png';

export function useBookImageUpload(initialPortraitImageUrl) {
  const [avatarURL, setAvatarURL] = useState(initialPortraitImageUrl ?? DefaultImage);
  const [portraitimageurl, setPortraitImageUrl] = useState(initialPortraitImageUrl);
  const fileUploadRef = useRef();

  const minioEndpoint = process.env.REACT_APP_MINIO_ENDPOINT || '';
  const minioUserName = process.env.REACT_APP_MINIO_USERNAME || '';
  const minioPassword = process.env.REACT_APP_MINIO_PASSWORD || '';
  const minioBucketName = process.env.REACT_APP_MINIO_BUCKET_NAME || '';

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

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async () => {
    const uploadedFile = fileUploadRef.current.files[0];
    const cachedURL = URL.createObjectURL(uploadedFile);
    setAvatarURL(cachedURL);
    const response = await fetch(cachedURL);
    const data = await response.arrayBuffer();
    setPortraitImageUrl(`${minioEndpoint}/${minioBucketName}/${uploadedFile.name}`);
    uploadFile(uploadedFile.name, data);
  };

  return {
    avatarURL,
    setAvatarURL,
    portraitimageurl,
    setPortraitImageUrl,
    fileUploadRef,
    handleImageUpload,
    uploadImageDisplay,
  };
}

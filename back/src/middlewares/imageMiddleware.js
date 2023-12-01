import AWS from 'aws-sdk';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
const path = require('path');

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
});

const s3 = new AWS.S3();

const bucketName = process.env.S3_BUCKET_NAME;
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];
const signedUrlExpireSeconds = 60 * 5;

export default function createUrl(fileName) {
  const url = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    key: fileName,
    Expires: signedUrlExpireSeconds,
    ContentType: 'image/*',
  });
  return url;
}

const imageDelete = async (imageUrl) => {
  try {
    const imageKey = imageUrl.split('.com/')[1];
    const result = await s3
      .deleteObject({
        Bucket: bucketName,
        Key: imageKey,
      })
      .promise();

    return result;
  } catch (err) {
    console.error('파일이 삭제되지 않았습니다.', err);
    throw new Error('파일이 삭제되지 않았습니다.');
  }
};

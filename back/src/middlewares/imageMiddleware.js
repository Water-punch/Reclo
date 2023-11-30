import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
const path = require('path');

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
});

const s3 = new AWS.S3();

const bucketName = 'reclo';
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];

const imageUploader_user = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    key: (req, file, callback) => {
      const extension = path.extname(file.originalname);

      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('파일의 확장자가 잘못되었습니다.'));
      }
      callback(null, `${UserImg}/${Date.now()}${extension}`);
    },
    acl: 'public-read',
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

const imageUploader_item = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    key: (req, file, callback) => {
      const extension = path.extname(file.originalname);

      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('파일의 확장자가 잘못되었습니다.'));
      }
      callback(null, `${ItemImg}/${Date.now()}${extension}`);
    },
    acl: 'public-read',
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

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

export { imageUploader_user, imageUploader_item, imageDelete };

// import AWS from 'aws-sdk';
// const path = require('path');

// AWS.config.update({
//   region: 'ap-northeast-2',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
// });

// const s3 = new AWS.S3();

// const bucketName = process.env.S3_BUCKET_NAME;
// const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];
// const signedUrlExpireSeconds = 60 * 5;

// export default function createUrl(fileName) {
//   const url = s3.getSignedUrl('putObject', {
//     Bucket: bucketName,
//     key: fileName,
//     Expires: signedUrlExpireSeconds,
//     ContentType: 'image/*',
//   });
//   return url;
// }

// async function saveItemImage(fileName) {
//   const newItem = new ItemModel({ fileName });
//   await newItem.save();
//   return newItem;
// }

// app.get('/start-upload', async (req, res, next) => {
//   try {
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: req.query.fileName,
//       ContentType: req.query.fileType,
//     };

//     const uploadData = await s3.createMultipartUpload(params).promise();
//     res.send({ uploadId: uploadData.UploadId });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get('/get-upload-url', async (req, res, next) => {
//   try {
//     let params = {
//       Bucket: BUCKET_NAME,
//       Key: req.query.fileName,
//       PartNumber: req.query.partNumber,
//       UploadId: req.query.uploadId,
//     };
//     console.log(params);
//     let uploadPartPromised = BluebirdPromise.promisify(s3.getSignedUrl.bind(s3));
//     let presignedUrl = await uploadPartPromised('uploadPart', params);
//     res.send({ presignedUrl });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post('/complete-upload', async (req, res, next) => {
//   try {
//     console.log(req.body, ': body');
//     let params = {
//       Bucket: BUCKET_NAME,
//       Key: req.body.params.fileName,
//       MultipartUpload: {
//         Parts: req.body.params.parts,
//       },
//       UploadId: req.body.params.uploadId,
//     };
//     console.log(params);
//     let completeUploadPromised = BluebirdPromise.promisify(s3.completeMultipartUpload.bind(s3));
//     let data = await completeUploadPromised(params);
//     res.send({ data });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

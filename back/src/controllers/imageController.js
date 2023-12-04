const ObjectId = require('mongoose').Types.ObjectId;
const { imageService } = require('../services/imgService');

// 이미지 업로드를 위한 presigned URL 요청
async function getItemPresignedUrl(req, res, next) {
  try {
    const fileName = req.params.fileName;
    // const fileName = Date.now() + file;
    const presignedUrl = await imageService.createItemPresignedUrl(fileName);
    res.send({ presignedUrl });
  } catch (error) {
    next(error);
  }
}

// 유저 이미지 업로드를 위한 presigned URL 요청
async function getUserPresignedUrl(req, res, next) {
  try {
    const fileName = req.params.fileName;
    const presignedUrl = await imageService.createUserPresignedUrl(fileName);
    res.send({ presignedUrl });
  } catch (error) {
    next(error);
  }
}

// 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
async function uploadItemImage(req, res, next) {
  try {
    console.log('imageInfo');
    const imageInfo = req.body.imageInfo;

    const imageData = await imageService.uploadItemImage({ imageInfo });
    res.send({ imageData });
  } catch (error) {
    next(error);
  }
}

module.exports = { getItemPresignedUrl, getUserPresignedUrl, uploadItemImage };

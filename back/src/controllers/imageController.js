const ObjectId = require('mongoose').Types.ObjectId;
const { imageService } = require('../services/imgService');

// 아이템 이미지 업로드를 위한 presigned URL 요청
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

// 아이템 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
async function uploadItemImage(req, res, next) {
  try {
    const imageInfo = req.body.imageInfo;
    const imageData = await imageService.uploadImage({ imageInfo });
    res.send({ imageData });
  } catch (error) {
    next(error);
  }
}

// 아이템 이미지 수정
async function setItemImage(req, res, next) {
  try {
    const imageId = req.params._id;
    const toUpdate = req.body.toUpdate;
    const updatedItemImage = await imageService.updateItemImage({ imageId, toUpdate });
    if (!updatedItemImage) {
      throw new Error(updatedItemImage.errorMessage);
    }
    res.status(200).send({
      message: '아이템 이미지 수정에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

// 아이템 이미지 삭제
async function deletedItemImage(req, res, next) {
  try {
    const imageId = req.params._id;
    // const imageUrl = req.params.imageUrl;

    const deleteItem = await imageService.deleteItemImage({ imageId });
    if (!deleteItem) {
      throw new Error(findItem.errorMessage);
    }
    res.status(200).send({
      message: '아이템 이미지 삭제에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

// 유저 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
async function uploadUserImage(req, res, next) {
  try {
    const imageInfo = req.body.imageInfo;
    const imageData = await imageService.uploadImage({ imageInfo });
    res.send({ imageData });
  } catch (error) {
    next(error);
  }
}

// 유저 이미지 수정
async function setUserImage(req, res, next) {
  try {
    const imageId = req.params._id;
    const toUpdate = req.body.toUpdate;
    const updatedUserImage = await imageService.updateUserImage({ imageId, toUpdate });
    if (!updatedUserImage) {
      throw new Error(updatedUserImage.errorMessage);
    }
    res.status(200).send({
      message: '아이템 이미지 수정에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

// S3에 유저 이미지 삭제를 위한 image url 요청
async function getDelUserUrl(req, res, next) {
  try {
    const imageId = req.params._id;
    console.log(imageId);
    const deleteUserUrl = await imageService.getdeleteUrl({ imageId });
    if (!deleteUserUrl) {
      throw new Error(deleteUserUrl.errorMessage);
    }
    // console.log(deleteUserUrl);
    res.status(200).send({
      message: '유저 이미지 삭제를 위한 Image URL 요청에 성공했습니다',
    });
  } catch (error) {
    next(error);
  }
}

// DB에 저장된 유저 이미지 삭제
async function deleteUserImage(req, res, next) {
  try {
    const imageId = req.params._id;
    const deleteItem = await imageService.deleteUserImage({ imageId });
    if (!deleteItem) {
      throw new Error(deleteItem.errorMessage);
    }
    res.status(200).send({
      message: '유저 이미지 삭제에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getItemPresignedUrl,
  getUserPresignedUrl,
  uploadItemImage,
  uploadUserImage,
  setItemImage,
  setUserImage,
  deleteUserImage,
  getDelUserUrl,
  deletedItemImage,
};

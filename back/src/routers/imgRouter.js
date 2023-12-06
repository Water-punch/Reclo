const { Router } = require('express');
const { login_required } = require('../middlewares/login_required.js');
const { asyncHandler } = require('../middlewares/asyncHandler.js');
const imageController = require('../controllers/imageController.js');

const imageRouter = Router();
imageRouter.use(asyncHandler(login_required));

// 아이템 이미지 업로드를 위한 presigned URL 요청
imageRouter.put('/itemURL/:fileName', imageController.getItemPresignedUrl);

// 유저 이미지 업로드를 위한 presigned URL 요청
imageRouter.put('/userURL/:fileName', imageController.getUserPresignedUrl);

// 아이템 관련 콜렉션 라우터
// 아이템 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
imageRouter.post('/itemImage/:fileName', imageController.uploadItemImage);

// 저장된 아이템 이미지 정보 수정
imageRouter.put('/itemImage/:_id', imageController.setItemImage);

// // 저장된 아이템 이미지 정보 삭제
imageRouter.delete('/itemImage/:_id', imageController.deletedItemImage);

// 유저 관련 콜렉션 라우터
// 유저 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
imageRouter.post('/userImage/:fileName', imageController.uploadUserImage);

// 저장된 유저 이미지 정보 수정
imageRouter.put('/userImage/:_id', imageController.setUserImage);

// S3에 유저 이미지 삭제를 위한 image url 요청
imageRouter.get('/userImage/:_id', imageController.getDelUserUrl);

// 저장된 유저 이미지 정보 삭제
imageRouter.delete('/userImage/:_id', imageController.deleteUserImage);

export { imageRouter };

const { Router } = require('express');
const { login_required } = require('../middlewares/login_required');
const { asyncHandler } = require('../middlewares/asyncHandler');
const imageController = require('../controllers/imageController');

const imageRouter = Router();
imageRouter.use(asyncHandler(login_required));

// 아이템 이미지 업로드를 위한 presigned URL 요청
imageRouter.put('/itemURL/:fileName', imageController.getItemPresignedUrl);

// 유저 이미지 업로드를 위한 presigned URL 요청
imageRouter.put('/userURL/:fileName', imageController.getUserPresignedUrl);

// 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
imageRouter.post('/image/:fileName', imageController.uploadImage);

// 저장된 아이템 이미지 정보 수정
imageRouter.put('/itemImage/:_id', imageController.setItemImage);

// // 저장된 아이템 이미지 정보 삭제
imageRouter.delete('/itemImage/:_id', imageController.deleteItemImage);

// //특정 itemId의 이미지 조회
// imageRouter.get('/itemImages/:itemId', imageController.getImagesItem);

// //특정 userId의 이미지 조회
// imageRouter.get('/userImage/:userId', imageController.getImageUser);

export { imageRouter };

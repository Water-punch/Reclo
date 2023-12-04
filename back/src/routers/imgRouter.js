const { Router } = require('express');
const { login_required } = require('../middlewares/login_required');
const { asyncHandler } = require('../middlewares/asyncHandler');
const imageController = require('../controllers/imageController');

const imageRouter = Router();
// imageRouter.use(asyncHandler(login_required));

// 아이템 이미지 업로드를 위한 presigned URL 요청
imageRouter.put('/itemURL/:fileName', imageController.getItemPresignedUrl);

// 유저 이미지 업로드를 위한 presigned URL 요청
imageRouter.put('/userURL/:fileName', imageController.getUserPresignedUrl);

// 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
imageRouter.post('/itemImage/:fileName', imageController.uploadItemImage);

// 저장된 이미지 정보 수정
imageRouter.put('/itemImage/:fileName', imageController.updateItemImage);

// 저장된 이미지 정보 삭제
imageRouter.delete('/itemImage/:fileName', imageController.deleteItemImage);

//특정 itemId의 이미지 조회
imageRouter.get('/itemImages/:itemId', imageController.getImagesItem);

//특정 userId의 이미지 조회
imageRouter.get('/userImage/:userId', imageController.getImageUser);

// imageRouter.get('/images', imageController.imageGetAll);

// imageRouter.get('/images/:_id', imageController.imageGet);

// imageRouter.get('/images?object=value', imageController.imageObjectGetAll);

// imageRouter.put('/images/:_id', imageUpdateValidation, upload.single('image'), imageController.imageUpdate);

// imageRouter.delete('/images/:_id', imageController.imageDelete);

export { imageRouter };

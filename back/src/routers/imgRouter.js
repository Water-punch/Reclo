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

// 채팅 이미지 업로드를 위한 presigned URL 요청
imageRouter.put('/chatURL/:fileName', imageController.getChatPresignedUrl);

export { imageRouter };

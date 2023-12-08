const { Router } = require('express');
const { login_required } = require('../middlewares/login_required.js');
const { asyncHandler } = require('../middlewares/asyncHandler.js');
const wishItemController = require('../controllers/wishItemController.js');

const wishItemRouter = Router();

// 유저별 관심상품 조회
wishItemRouter.get('/userLikes', asyncHandler(login_required), wishItemController.getLikedItems);

// 관심상품 추가 & 삭제
wishItemRouter.put('/userLikes/:itemId', asyncHandler(login_required), wishItemController.toggleItemLikes);

export { wishItemRouter };

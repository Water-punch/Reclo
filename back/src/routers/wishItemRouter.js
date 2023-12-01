const { Router } = require('express');
const { login_required } = require('../middlewares/login_required');
const { asyncHandler } = require('../middlewares/asyncHandler');
const wishItemController = require('../controllers/wishItemController');

const wishItemRouter = Router();

// 관심상품 조회
wishItemRouter.get('/item/:itemId/likes', asyncHandler(login_required), wishItemController.getLikedItems);

// 관심상품 추가
wishItemRouter.put('/item/:itemId/likes', asyncHandler(login_required), wishItemController.putItemLikes);

// 관심상품 삭제
wishItemRouter.put('/item/:itemId/dislikes', asyncHandler(login_required), wishItemController.putItemDislikes);

export { wishItemRouter };

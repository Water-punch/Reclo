const { Router } = require('express');
const { login_required } = require('../middlewares/login_required');
const { asyncHandler } = require('../middlewares/asyncHandler');
const wishItemController = require('../controllers/wishItemController');

const wishItemRouter = Router();

// 유저별 관심상품 조회
wishItemRouter.get('/item/user-likes/:userId', asyncHandler(login_required), wishItemController.getLikedItems);

// 관심상품별 상세내용 조회
wishItemRouter.get('/item/like-detail/:itemId', asyncHandler(login_required), wishItemController.getLikedItemDetails);

// 관심상품 추가 & 삭제
wishItemRouter.put('/item/:itemId/likes', asyncHandler(login_required), wishItemController.toggleItemLikes);

// 관심상품 삭제
// wishItemRouter.put('/item/:itemId/dislikes', asyncHandler(login_required), wishItemController.putItemDislikes);

export { wishItemRouter };

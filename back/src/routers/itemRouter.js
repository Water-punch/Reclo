const { Router } = require('express');
const { login_required } = require('../middlewares/login_required');
const { asyncHandler } = require('../middlewares/asyncHandler');
const itemController = require('../controllers/itemController');

const itemRouter = Router();

// 커서 기반 페이징으로 품목 조회
itemRouter.get('/items', itemController.getPagedItems);

// 카테고리별 아이템 조회
itemRouter.get('/items', itemController.getItemsByCategory);

// 검색으로 아이템 조회
itemRouter.get('/itemsearch', itemController.getItemsBySearch);

// 검색으로 아이템 조회
itemRouter.get('/itemsearch', itemController.getItemsBySearch);

// 유저별 품목 조회
itemRouter.get('/items/user/:userId', asyncHandler(login_required), itemController.getUserItems);

// 아이템별 상세내용 조회
itemRouter.get('/item/:itemId', itemController.getItemDetails);

// 아이템 추가하기
itemRouter.post('/item/:userId', asyncHandler(login_required), itemController.addItem);
itemRouter.post('/item/:userId', asyncHandler(login_required), itemController.addItem);

// 아이템 수정하기
itemRouter.put('/item/:itemId', asyncHandler(login_required), itemController.setItem);

// 아이템 삭제하기
itemRouter.post('/item/:userId', asyncHandler(login_required), itemController.addItem);

itemRouter.put('/item/:itemId', asyncHandler(login_required), itemController.setItem);

// 아이템 삭제하기
itemRouter.delete('/item/:itemId', asyncHandler(login_required), itemController.deleteItem);
itemRouter.delete('/item/:itemId', asyncHandler(login_required), itemController.deleteItem);

export { itemRouter };

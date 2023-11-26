const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/login_required');
const { itemAuthService } = require('../services/itemService');
const { imageUploader, imageDelete } = require('../middlewares/imageMiddleware');
const itemController = require('../controllers/itemController');

const itemAuthService = Router();

// 전체 품목 조회
itemAuthRouter.get('/items', itemController.getAllItems);

//  유저별 품목 조회
itemAuthRouter.get('/items/:userId', login_required, itemController.getUserItems);

//  아이템별 상세내용 조회
itemAuthRouter.get('/items/:itemId', login_required, itemController.getItemDetails);

// 아이템 추가하기
itemAuthService.post(
  '/items/:userId',
  login_required,
  imageUploader.array('image'),
  request_checked,
  itemController.addItem
);

// 아이템 수정하기
itemAuthRouter.put(
  '/items/:itemId',
  login_required,
  userId_checked,
  imageUploader.array('image'),
  request_checked,
  itemController.setItem
);

// 아이템 삭제하기
itemAuthRouter.delete('/items/:itemId', login_required, userId_checked, imageDelete, itemController.deleteItem);

export { itemAuthRouter };

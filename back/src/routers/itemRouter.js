const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/login_required');
const { imageUploader, imageDelete } = require('../middlewares/imageMiddleware');
const itemController = require('../controllers/itemController');

const itemRouter = Router();

// 전체 품목 조회
itemRouter.get('/items', itemController.getAllItems);

//  유저별 품목 조회
itemRouter.get('/items/:userId', login_required, itemController.getUserItems);

//  아이템별 상세내용 조회
itemRouter.get('/items/:itemId', login_required, itemController.getItemDetails);

// 아이템 추가하기
itemRouter.post(
  '/items/:userId',
  login_required,
  imageUploader.fields({ name: 'image', limits: 5 }),
  request_checked,
  itemController.addItem
);

// 아이템 수정하기
itemRouter.put(
  '/items/:itemId',
  login_required,
  userId_checked,
  imageUploader.fields({ name: 'image', limits: 5 }),
  request_checked,
  itemController.setItem
);

// 아이템 삭제하기
itemRouter.delete('/items/:itemId', login_required, userId_checked, imageDelete, itemController.deleteItem);

export { itemRouter };

const { Router } = require('express');
// const { login_required, userId_checked, request_checked } = require('../middlewares/login_required');
// const { imageUploader_user, imageUploader_item, imageDelete } = require('../middlewares/imageMiddleware');
const itemController = require('../controllers/itemController');

const itemRouter = Router();

// 전체 품목 조회
// itemRouter.get('/items', itemController.getAllItems);

// 페이징된 아이템 조회
// itemRouter.get('/items/paged', getPagedItems);

// 카테고리별 아이템 조회
itemRouter.get('/items', itemController.getItemsByCategory);

//  유저별 품목 조회
// itemRouter.get('/items/:userId', login_required, itemController.getUserItems);
itemRouter.get('/items/user/:userId', itemController.getUserItems);

//  아이템별 상세내용 조회
// itemRouter.get('/items/:itemId', login_required, itemController.getItemDetails);
itemRouter.get('/item/:itemId', itemController.getItemDetails);

// 아이템 추가하기
// itemRouter.post(
//   '/items/:userId',
//   login_required,
//   imageUploader_item.fields({ name: 'image', limits: 5 }),
//   request_checked,
//   itemController.addItem
// );

itemRouter.post('/item', itemController.addItem);

// 아이템 수정하기
// itemRouter.put(
//   '/item/:itemId',
//   login_required,
//   userId_checked,
//   imageUploader_item.fields({ name: 'image', limits: 5 }),
//   request_checked,
// )

itemRouter.put('/item/:itemId', itemController.setItem);

// 아이템 삭제하기
// itemRouter.post('/items/:itemId', login_required, userId_checked, imageDelete, itemController.deleteItem);
itemRouter.delete('/item/:itemId', itemController.deleteItem);

export { itemRouter };

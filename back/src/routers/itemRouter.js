const { Router } = require('express');
// const { login_required, userId_checked, request_checked } = require('../middlewares/login_required');
// const { imageUploader_user, imageUploader_item, imageDelete } = require('../middlewares/imageMiddleware');
const itemController = require('../controllers/itemController');

const itemRouter = Router();

// 전체 품목 조회
// itemRouter.get('/items', itemController.getAllItems);

itemRouter.get('/items', async (req, res, next) => {
  try {
    await itemController.getAllItems(req, res, next);
  } catch (error) {
    console.error('Error in itemRouter.get("/items"): ', error);
    next(error);
  }
});

// // 페이징된 아이템 조회
// itemRouter.get('/items/paged', getPagedItems);

//  유저별 품목 조회
// itemRouter.get('/items/:userId', login_required, itemController.getUserItems);

itemRouter.get('/items/user/:userId', async (req, res, next) => {
  try {
    await itemController.getUserItems(req, res, next);
  } catch (error) {
    console.error('Error in itemRouter.get("/items/:userId"): ', error);
    next(error);
  }
});

//  아이템별 상세내용 조회
// itemRouter.get('/items/:itemId', login_required, itemController.getItemDetails);

itemRouter.get('/items/item/:itemId', async (req, res, next) => {
  try {
    await itemController.getItemDetails(req, res, next);
  } catch (error) {
    console.error('Error in itemRouter.get("/items/:itemId"): ', error);
    next(error);
  }
});

// 아이템 추가하기
// itemRouter.post(
//   '/items/:userId',
//   login_required,
//   imageUploader_item.fields({ name: 'image', limits: 5 }),
//   request_checked,
//   itemController.addItem
// );

itemRouter.post(
  '/items/:userId',
  // login_required,
  // imageUploader_item.fields({ name: 'image', limits: 5 }),
  // request_checked,
  async (req, res, next) => {
    try {
      // console.log(req.body);
      await itemController.addItem(req, res, next);
    } catch (error) {
      console.error('Error in itemRouter.post("/items/:userId"): ', error);
      next(error);
    }
  }
);

// 아이템 수정하기
itemRouter.put(
  '/items/:itemId',
  // login_required,
  // userId_checked,
  // imageUploader_item.fields({ name: 'image', limits: 5 }),
  // request_checked,

  async (req, res, next) => {
    try {
      await itemController.setItem(req, res, next);
      // console.log('라우터', req.body);
    } catch (error) {
      console.error('Error in itemRouter.post("/items/:itemId"): ', error);
      next(error);
    }
  }
);

// 아이템 삭제하기
// itemRouter.delete('/items/:itemId', login_required, userId_checked, imageDelete, itemController.deleteItem);
itemRouter.delete('/items/:itemId', async (req, res, next) => {
  try {
    await itemController.deleteItem(req, res, next);
  } catch (error) {
    console.error('Error in itemRouter.delete("/items/:itemId"): ', error);
    next(error);
  }
});

export { itemRouter };

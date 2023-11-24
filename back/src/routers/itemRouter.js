const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/login_required');
const { NotFoundError } = require('../middlewares/errorMiddleware');
const { itemAuthService } = require('../services/itemService');
const { imageUploader } = require("../middlewares/imageUpload");
const ObjectId = require('mongoose').Types.ObjectId;

const itemAuthService = Router();

// 아이템 추가하기
itemAuthService.post("/items/:user-id", login_required, imageUploader.array("image"), request_checked,
  async function (req, res, next) {
    try {
      const userId = ObjectId(req.params.id);
      const itemImgUrl = req.files[0].location;
      
      const { itemTitle, itemName, itemDescription, itemCategory, itemLike, itemPrice, itemState } = req.body;
      const newItem = await itemAuthService.addItem({ userId, itemTitle, itemName, itemDescription, itemImgUrl, itemCategory, itemLike, itemPrice, itemState });

      if (!newItem) {
        throw new NotFoundError("해당 아이템이 생성되지 않았습니다.");
      }

      res.status(201).send({
        itemId: newItem._id,
        itemImgUrl: newItem.itemImgUrl,
        message: "아이템 추가에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  });


// 전체 품목 조회
itemAuthRouter.get("/items", login_required, async function (req, res, next) {
  try {
    const userId = ObjectId(req.params.id);
    const items = await itemAuthService.getItems({ userId });

    if (!items) {
      throw new NotFoundError("아이템을 가져올 수 없습니다.");
    }
    res.status(200).send({ items });
  } catch (error) {
    next(error);
  }
});


// 아이템 수정하기
itemAuthRouter.put("/items/:item-id", login_required, userId_checked, imageUploader.array("image"), request_checked,
  async function (req, res, next) {
    try {
      const itemId = ObjectId(req.params.itemId);
    //   console.log('아이템url', req.files[0].location);
      const { itemTitle, itemName, itemDescription, itemImgUrl, itemCategory, itemLike, itemPrice, itemState } = req.body;
      const toUpdate = { itemTitle, itemName, itemDescription, itemImgUrl, itemCategory, itemLike, itemPrice, itemState };

      const updatedItem = await itemAuthService.setItem({ itemId, toUpdate });

      if (!updatedItem) {
        throw new NotFoundError("해당 아이템이 수정되지 않았습니다.");
      }

      res.status(200).send({
        itemImgUrl: updatedItem.itemImgUrl,
        message: "아이템 수정에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  });


// 아이템 삭제하기
itemAuthRouter.delete("/items/:item-id", login_required, userId_checked, async function (req, res, next) {
  const itemId = ObjectId(req.params.itemId);

  try {
    const deleteItem = await itemAuthService.deleteItem({ itemId });
    const deleteImage = await imageDelete({imageUrl})

    if (!deleteItem) {
      throw new NotFoundError("해당 프로젝트가 삭제되지 않았습니다.");
    }

    res.status(200).send({
      message: "프로젝트 삭제에 성공했습니다."
    });
  } catch (error) {
    next(error);
  }

});

export { itemAuthRouter };

const ObjectId = require('mongoose').Types.ObjectId;
const { itemAuthService } = require('../services/itemService');

const { imageUploader, imageDelete } = require('../middlewares/imageMiddleware');

// 전체 품목 조회
async function getAllItems(req, res, next) {
  const { itemCategory, itemSearch } = req.query;
  try {
    if (itemCategory) {
      const items = await itemAuthService.getItems({ itemCategory });
      res.status(200).json({ items });
    } else if (itemCategory) {
      const items = await itemAuthService.getItems({ itemSearch });
      res.status(200).json({ items });
    } else if (!allItems) {
      const allItems = await itemAuthService.getItems({});
      throw new Error(allItems.errorMessage);
    } else {
      const allItems = await itemAuthService.getItems({});
      res.status(200).send({ allItems });
    }
  } catch (error) {
    next(error);
  }
}

// 유저별 품목 조회
async function getUserItems(req, res, next) {
  try {
    const userId = ObjectId(req.params.userId);
    const userItems = await itemAuthService.getItems({ userId });

    if (!userItems) {
      throw new Error(userItems.errorMessage);
    }

    res.status(200).send({ userItems });
  } catch (error) {
    next(error);
  }
}

// 아이템 상세내용 조회
async function getItemDetails(req, res, next) {
  try {
    const itemId = ObjectId(req.params.itemId);
    const itemDetails = await itemAuthService.getItemDetails({ itemId });

    if (!itemDetails) {
      throw new Error(itemDetails.errorMessage);
    }

    res.status(200).send({ itemDetails });
  } catch (error) {
    next(error);
  }
}

// 아이템 추가하기
async function addItem(req, res, next) {
  try {
    const userId = ObjectId(req.params.userId);

    // 이미지 업로드
    imageUploader.array('image')(req, res, async function (err) {
      if (err) {
        return next(err);
      }

      const itemImgUrl = req.files[0].location;

      const { itemTitle, itemName, itemDescription, itemCategory, itemLike, itemPrice, itemState } = req.body;

      // DB에 데이터 추가
      const newItem = await itemAuthService.addItem({
        userId,
        itemTitle,
        itemName,
        itemDescription,
        itemImgUrl,
        itemCategory,
        itemLike,
        itemPrice,
        itemState,
      });

      if (!newItem) {
        throw new Error(newItem.errorMessage);
      }

      res.status(201).send({
        itemId: newItem._id,
        itemImgUrl: newItem.itemImgUrl,
        message: '아이템 추가에 성공했습니다.',
      });
    });
  } catch (error) {
    next(error);
  }
}

// 아이템 수정하기
async function setItem(req, res, next) {
  try {
    const itemId = ObjectId(req.params.itemId);
    const { itemTitle, itemName, itemDescription, itemImgUrl, itemCategory, itemLike, itemPrice, itemState } = req.body;

    const toUpdate = {
      itemTitle,
      itemName,
      itemDescription,
      itemImgUrl,
      itemCategory,
      itemLike,
      itemPrice,
      itemState,
    };

    const updatedItem = await itemAuthService.setItem({ itemId, toUpdate });

    if (!updatedItem) {
      throw new Error(updatedItem.errorMessage);
    }

    res.status(200).send({
      itemImgUrl: updatedItem.itemImgUrl,
      message: '아이템 수정에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

// 아이템 삭제하기
async function deleteItem(req, res, next) {
  const itemId = ObjectId(req.params.itemId);
  // delete 로직 수정 필요
  try {
    const deleteImageAndItem = await Promise.all([
      imageDelete(item.itemImgUrl),
      itemAuthService.deleteItem({ itemId }),
    ]);

    const [deleteImageResult, deleteItemResult] = deleteImageAndItem;

    //   const deleteItem = await itemAuthService.deleteItem({ itemId });
    //   // 이미지 URL까지 같이 삭제
    //   const deleteImage = await imageDelete({ imageUrl: deleteItem.itemImgUrl });

    if (!deleteItemResult) {
      throw new Error(deleteItemResult.errorMessage);
    }

    if (!deleteImageResult) {
      throw new Error(deleteImageResult.errorMessage);
    }

    res.status(200).send({
      message: '아이템 삭제에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllItems,
  getUserItems,
  getItemDetails,
  addItem,
  setItem,
  deleteItem,
};

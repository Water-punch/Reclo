const ObjectId = require('mongoose').Types.ObjectId;
const { imageService } = require('../services/imgService.js');
const { itemService } = require('../services/itemService.js');

// 페이징을 적용한 전체 품목 조회
async function getPagedItems(req, res, next) {
  try {
    const itemCursor = req.query.itemCursor;
    const limit = req.query.limit;
    const items = await itemService.getCursorItems({ itemCursor, limit });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}

// 검색으로 아이템 조회
async function getItemsBySearch(req, res, next) {
  try {
    const searchItem = req.query.searchItem;
    if (searchItem) {
      const items = await itemService.getItemsBySearch({ searchItem });
      res.status(200).json({ items });
    }
  } catch (error) {
    next(error);
  }
}

// 카테고리별 아이템 조회
async function getItemsByCategory(req, res, next) {
  try {
    const category = req.query.category;
    if (category) {
      const items = await itemService.getItemsByCategory({ category });
      res.status(200).json({ items });
    } else if (!category) {
      items = await itemService.getAllItems();
    }

    res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
}

// 유저별 품목 조회
async function getUserItems(req, res, next) {
  try {
    const userId = req.currentUserId;
    const userItems = await itemService.getUserItems({ userId });
    // if (!userItems) {
    //   // throw new Error(userItems.errorMessage);
    // }

    res.status(200).send({ userItems });
  } catch (error) {
    next(error);
  }
}

// 아이템 상세내용 조회
async function getItemDetails(req, res, next) {
  try {
    const itemId = req.params.itemId;
    const itemDetails = await itemService.getItemDetails({ itemId });

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
    const userId = req.currentUserId;
    const itemInfo = req.body.itemInfo;

    const itemsImgUrl = itemInfo.itemsImgUrl ?? null;

    // DB에 데이터 추가
    const newItem = await itemService.addItem({
      itemInfo,
      userId,
    });

    if (itemsImgUrl) {
      const itemsImage = await imageService.uploadImages({ ImgUrl: itemsImgUrl });
    }

    res.status(201).send({
      itemId: newItem._id,
    });
  } catch (error) {
    next(error);
  }
}

// 아이템 수정하기
async function setItem(req, res, next) {
  try {
    const itemId = new ObjectId(req.params.itemId);
    const toUpdate = req.body.toUpdate;
    const newItemsImgUrl = itemInfo.itemsImgUrl ?? null;

    const item = await itemService.getItemDetails({ itemId });

    const updatedItem = await itemService.setItem({ itemId, toUpdate });
    if (!updatedItem) {
      throw new Error(updatedItem.errorMessage);
    }

    // DB에 데이터 추가

    if (newItemsImgUrl) {
      const itemsImage = imageService.updateImages({ ImgUrl: item.itemsImgUrl, newImgUrl: newItemsImgUrl });
    }

    res.status(200).send({
      // itemImgUrl: updatedItem.itemImgUrl,
      message: '아이템 수정에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

// 아이템 삭제하기
async function deleteItem(req, res, next) {
  // const itemId = ObjectId(req.params.itemId);
  // delete 로직 수정 필요
  try {
    const item = new ObjectId(req.params.itemId);
    const deleteItem = await itemService.deleteById({ itemId: item });
    if (!deleteItem) {
      throw new Error(findItem.errorMessage);
    }

    res.status(200).send({
      message: '아이템 삭제에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPagedItems,
  getItemsByCategory,
  getItemsBySearch,
  getUserItems,
  getItemDetails,
  addItem,
  setItem,
  deleteItem,
};

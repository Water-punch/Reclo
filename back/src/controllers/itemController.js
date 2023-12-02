const ObjectId = require('mongoose').Types.ObjectId;
const { itemService } = require('../services/itemService');

// 페이징을 적용한 전체 품목 조회
async function getAllItems(req, res, next) {
  const currentPage = req.query.page || 1;
  const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;

  try {
    const items = await itemService.getAllItems();

    // 페이징을 적용한 응답
    const totalItems = items.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const paginatedItems = items.slice(startIndex, endIndex);

    if (paginatedItems) {
      res.status(200).json({ items: paginatedItems, totalItems });
    } else {
      res.status(404).json({ message: '페이지에 대한 아이템이 없습니다.' });
    }
  } catch (error) {
    next(error);
  }
}

// 카테고리별 아이템 조회
async function getItemsByCategory(req, res, next) {
  let items;
  try {
    const category = req.query.category;
    if (category) {
      items = await itemService.getItemsByCategory({ category });
      // res.status(200).json({ items });
    } else if (!category) {
      items = await itemService.getAllItems();
    }

    res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
}

// 검색으로 아이템 조회
async function getItemsBySearch(req, res, next) {
  let items;
  try {
    const searchItem = req.query.searchItem;
    if (searchItem) {
      items = await itemService.getItemsBySearch({ searchItem });
    }
    res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
}

// 유저별 품목 조회
async function getUserItems(req, res, next) {
  try {
    const userId = new ObjectId(req.params.userId);
    const userItems = await itemService.getUserItems({ userId });
    if (!userItems) {
      // throw new Error(userItems.errorMessage);
    }

    res.status(200).send({ userItems });
  } catch (error) {
    next(error);
  }
}

// 아이템 상세내용 조회
async function getItemDetails(req, res, next) {
  try {
    const itemId = new ObjectId(req.params.itemId);
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
    // 이미지 업로드
    // imageUploader_item.array('image')(req, res, async function (err) {
    // if (err) {
    //   return next(err);
    // }

    const itemInfo = req.body.itemInfo;

    // DB에 데이터 추가
    const newItem = await itemService.addItem({
      itemInfo,
    });

    // const itemImgUrl = req.files[0].location;

    if (!newItem) {
      throw new Error(newItem.errorMessage);
    }
    res.status(201).send({
      itemId: newItem._id,
      // itemImgUrl: newItem.itemImgUrl,
      // message: '아이템 추가에 성공했습니다.',
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

    const updatedItem = await itemService.setItem({ itemId, toUpdate });
    if (!updatedItem) {
      throw new Error(updatedItem.errorMessage);
    }

    res.status(200).send({
      // itemImgUrl: updatedItem.itemImgUrl,
      // message: '아이템 수정에 성공했습니다.',
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
    // await Image.imageDelete({ imageUrl: deleteItem.itemImgUrl });
    // const [deleteItem, deleteImage] = await imageDeleteAndItem({ imageUrl: deleteItem.itemImgUrl });
    // 이미지 URL까지 같이 삭제

    if (!deleteItem) {
      throw new Error(findItem.errorMessage);
    }

    // if (!deletedImageResult) {
    //   throw new Error(deleteImageResult.errorMessage);
    // }

    res.status(200).send({
      message: '아이템 삭제에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllItems,
  getItemsByCategory,
  getItemsBySearch,
  getUserItems,
  getItemDetails,
  addItem,
  setItem,
  deleteItem,
};

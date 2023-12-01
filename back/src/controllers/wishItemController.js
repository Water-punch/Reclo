const ObjectId = require('mongoose').Types.ObjectId;
const { wishItemService } = require('../services/wishItemService');

// 관심상품 찾기
async function getLikedItems(req, res, next) {}

// 관심상품 등록
async function putItemLikes(req, res, next) {
  try {
    const likeInfo = req.body.likeInfo;
    const updateLike = await wishItemService.addLike({
      likeInfo,
    });
    if (updateLike.errorMessage) {
      throw new Error(updateLike.errorMessage);
    }

    return res.status(201).send(updateLike);
  } catch (error) {
    next(error);
  }
}

// 관심상품 삭제
async function putItemDislikes(req, res, next) {
  try {
    const likeInfo = req.body.likeInfo;
    const deletedLike = await wishItemService.deleteLike({
      likeInfo,
    });
    if (deletedLike.errorMessage) {
      throw new Error(deletedLike.errorMessage);
    }

    return res.status(201).send(deletedLike);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLikedItems,
  putItemLikes,
  putItemDislikes,
};

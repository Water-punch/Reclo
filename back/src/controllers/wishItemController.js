const ObjectId = require('mongoose').Types.ObjectId;
const { wishItemService } = require('../services/wishItemService');

// 유저별 관심상품 찾기
async function getLikedItems(req, res, next) {
  try {
    const userId = new ObjectId(req.params.userId);
    const userwishItems = await wishItemService.getUserLikeItems({ userId });
    if (!userwishItems) {
      throw new Error(userwishItems.errorMessage);
    }

    res.status(200).send({ userwishItems });
  } catch (error) {
    next(error);
  }
}

// 관심상품 상세내용 조회
async function getLikedItemDetails(req, res, next) {
  try {
    const itemId = new ObjectId(req.params.itemId);
    const likeItemDetails = await wishItemService.getLikeItemDetails({ itemId });

    if (!likeItemDetails) {
      throw new Error(likeItemDetails.errorMessage);
    }

    res.status(200).send({ likeItemDetails });
  } catch (error) {
    next(error);
  }
}

// 관심상품 등록 & 삭제
async function toggleItemLikes(req, res, next) {
  try {
    const likeInfo = req.body.likeInfo;
    const updateLike = await wishItemService.toggleLike({
      likeInfo,
    });
    if (!updateLike) {
      throw new Error(updateLike.errorMessage);
    }

    return res.status(201).send(updateLike);
  } catch (error) {
    next(error);
  }
}

// 관심상품 삭제
// async function putItemDislikes(req, res, next) {
//   try {
//     const likeInfo = req.body.likeInfo;
//     const deletedLike = await wishItemService.deleteLike({
//       likeInfo,
//     });
//     if (deletedLike.errorMessage) {
//       throw new Error(deletedLike.errorMessage);
//     }

//     return res.status(201).send(deletedLike);
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  getLikedItems,
  getLikedItemDetails,
  toggleItemLikes,
  // putItemDislikes,
};

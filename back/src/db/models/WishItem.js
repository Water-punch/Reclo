import { wishItemModel } from '../schemas/wishItem.js';
const ObjectId = require('mongoose').Types.ObjectId;

class wishItem {
  // 유저 아이디로 관심상품 찾기
  static async findLikeitems({ userId }) {
    console.log(userId);
    const userLikeditems = await wishItemModel
      .aggregate([
        {
          $match: {
            userId,
          },
        },

        {
          $lookup: {
            from: 'items', // 'User' 컬렉션
            localField: 'itemId', // 현재 가지고 있는 필드로
            foreignField: '_id', // '_id' 필드와 조인
            as: 'wishItemId', // 조인된 결과를 저장할 필드 이름
          },
        },
        {
          $unwind: '$wishItemId',
        },
      ])
      .exec();
    return userLikeditems;
  }

  // Like -> 유저 관심상품 등록
  static async addDeleteLike({ likeInfo }) {
    const existingLike = await wishItemModel.findOne({
      userId: likeInfo.userId,
      itemId: likeInfo.itemId,
    });

    if (existingLike) {
      const deleteWishItem = await wishItemModel.deleteOne({
        userId: likeInfo.userId,
        itemId: likeInfo.itemId,
        likeStatus: true,
      });
      return deleteWishItem;
    } else {
      const createNewWishItem = await wishItemModel.create({
        userId: likeInfo.userId,
        itemId: likeInfo.itemId,
        likeStatus: true,
      });
      return createNewWishItem;
    }
  }
}

export { wishItem };

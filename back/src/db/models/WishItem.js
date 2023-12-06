import { wishItemModel } from '../schemas/wishItem.js';

class wishItem {
  // 유저 아이디로 관심상품 찾기
  static async findLikeitems({ userId }) {
    const userLikeditems = await wishItemModel.find({ userId }).populate('Item');
    return userLikeditems;
  }

  // 관심상품 상세내용 조회
  static async findLikeitemDetails({ itemId }) {
    const item = await wishItemModel.findOne({ itemId }).populate('Item');
    return item;
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

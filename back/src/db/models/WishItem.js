import { wishItemModel } from '../schemas/wishItem';
const ObjectId = require('mongoose').Types.ObjectId;

class wishItem {
  // 유저 아이디로 관심상품 찾기
  static async findLikeitems({ userId }) {
    const userLikeditems = await wishItemModel.findOne({ userId });
    return userLikeditems;
  }

  // 관심상품 상세내용 조회
  static async findLikeitemDetails({ itemId }) {
    const item = await wishItemModel.findOne({ itemId }).populate('Item');
    return item;
  }

  // Like -> 유저 관심상품 등록
  static async addLike({ newItem }) {
    const createNewWishItem = await wishItemModel.create(newItem);
    return createNewWishItem;
  }

  // Dislike -> 유저 관심상품 해제
  static async deleteLike({ deleteItem }) {
    const deleteWishItem = await wishItemModel.deleteOne(deleteItem);
    return deleteWishItem;
  }
}

export { wishItem };

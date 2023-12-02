import { wishItemModel } from '../schemas/wishItem';
import { ConflictError } from '../../utils/customError';

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
    const existingLike = await wishItemModel.findOne({
      userId: newItem.userId,
      itemId: newItem.itemId,
    });

    if (existingLike) {
      throw new ConflictError('관심상품으로 이미 등록된 상품입니다.');
    }

    const createNewWishItem = await wishItemModel.create(newItem);
    return createNewWishItem;
  }

  // Dislike -> 유저 관심상품 해제
  static async deleteLike({ deleteItem }) {
    const existingLike = await wishItemModel.findOne({
      userId: deleteItem.userId,
      itemId: deleteItem.itemId,
    });
    if (existingLike) {
      const deleteWishItem = await wishItemModel.deleteOne(deleteItem);
      return deleteWishItem;
    } else {
      throw new ConflictError('관심상품에서 이미 삭제된 상품입니다.');
    }
  }
}

export { wishItem };

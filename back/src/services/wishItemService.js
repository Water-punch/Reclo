import { wishItem } from '../db';
import { Item } from '../db';
import { BadRequestError, INVALID_ITEM_Error, ConflictError } from '../utils/customError';

class wishItemService {
  // 관심상품 조회
  static async getUserLikeItems({ userId }) {
    const likedItems = await wishItem.findLikeitems({ userId });
    if (!likedItems) {
      throw new INVALID_ITEM_Error('해당 상품이 존재하지 않습니다.');
    }
    return likedItems;
  }

  // 관심상품별 상세내용 조회
  static async getLikeItemDetails({ itemId }) {
    const item = await wishItem.findLikeitemDetails({ itemId });
    if (!item) {
      throw new INVALID_ITEM_Error('해당 상품이 존재하지 않습니다.');
    }
    return item;
  }

  // 관심상품 등록
  static async addLike({ likeInfo }) {
    const item = await Item.findByItemId({ itemId: likeInfo.itemId });
    if (!item) {
      throw new BadRequestError('관심상품으로 등록되지 않았습니다.');
    }
    const AddLike = await wishItem.addLike({ newItem: likeInfo });
    if (AddLike) {
      const AddLike = await Item.likeUpdate({ itemId: likeInfo.itemId });
      return AddLike;
    } else if (!AddLike) {
      throw new ConflictError('관심상품으로 이미 등록된 상품입니다.');
    }
    return AddLike;
  }

  // 관심상품 삭제
  static async deleteLike({ likeInfo }) {
    const item = await Item.findByItemId({ itemId: likeInfo.itemId });
    if (!item) {
      throw new BadRequestError('관심상품에서 해제되지 않았습니다.');
    }
    const DeleteLike = await wishItem.deleteLike({ deleteItem: likeInfo });
    if (DeleteLike) {
      const DeleteLike = await Item.likeDelete({ itemId: likeInfo.itemId });
      return DeleteLike;
    } else if (!DeleteLike) {
      throw new ConflictError('관심상품에서 이미 삭제된 상품입니다.');
    }
    return DeleteLike;
  }
}

export { wishItemService };

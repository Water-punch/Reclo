import { wishItem } from '../db';
import { Item } from '../db';
import { BadRequestError, INVALID_ITEM_Error, ConflictError } from '../utils/customError.js';

class wishItemService {
  // 관심상품 조회
  static async getUserLikeItems({ userId }) {
    console.log(userId);
    const likedItems = await wishItem.findLikeitems({ userId });
    if (!likedItems) {
      throw new INVALID_ITEM_Error('해당 상품이 존재하지 않습니다.');
    }
    return likedItems;
  }

  // 관심상품 등록
  static async toggleLike({ likeInfo }) {
    const item = await Item.findByItemId({ itemId: likeInfo.itemId });
    if (!item) {
      throw new INVALID_ITEM_Error('해당 상품이 존재하지 않습니다.');
    }

    const likeCount = await wishItem.addDeleteLike({ likeInfo });
    if (!likeCount) {
      throw new INVALID_ITEM_Error('해당 상품이 관심상품으로 등록되지 않았습니다.');
    }
    if (likeCount.likeStatus) {
      const addLike = await Item.likeUpdate({ itemId: likeInfo.itemId });
      if (!addLike) {
        throw new INVALID_ITEM_Error('추가된 좋아요 개수가 반영되지 않았습니다.');
      }
      return likeCount;
    } else {
      const deleteLike = await Item.likeDelete({ itemId: likeInfo.itemId });
      if (!deleteLike) {
        throw new INVALID_ITEM_Error('삭제된 좋아요 개수가 반영되지 않았습니다.');
      }
      return likeCount;
    }
  }
}

export { wishItemService };

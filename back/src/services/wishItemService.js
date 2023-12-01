import { wishItem } from '../db';
import { Item } from '../db';

class wishItemService {
  // 관심상품 조회
  static async getUserLikeItems({ userId }) {
    const likedItems = await wishItem.findAll({ userId });

    return likedItems;
  }
  // 관심상품 등록
  static async addLike({ likeInfo }) {
    const item = await Item.findByItemId({ itemId: likeInfo.itemId });
    if (!item) {
      const errorMessage = '해당 상품이 존재하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const AddLike = await wishItem.addLike({ newItem: likeInfo });
    if (AddLike) {
      const AddLike = await Item.likeUpdate({ itemId: likeInfo.itemId });
      return AddLike;
    } else if (!AddLike) {
      const errorMessage = '좋아요를 이미 눌렀습니다.';
      return { errorMessage };
    }
    return AddLike;
  }

  // 관심상품 삭제
  static async deleteLike({ likeInfo }) {
    const item = await Item.findByItemId({ itemId: likeInfo.itemId });
    if (!item) {
      const errorMessage = '해당 상품은 존재하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const DeleteLike = await wishItem.deleteLike({ deleteItem: likeInfo });
    if (DeleteLike) {
      const DeleteLike = await Item.likeDelete({ itemId: likeInfo.itemId });
      return DeleteLike;
    } else if (!DeleteLike) {
      const errorMessage = '좋아요를 이미 눌렀습니다.';
      return { errorMessage };
    }
    return DeleteLike;
  }
}

export { wishItemService };

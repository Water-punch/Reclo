import { wishItemModel } from '../schemas/wishItem';
const ObjectId = require('mongoose').Types.ObjectId;

class wishItem {
  // 아이템 아이디로 아이템 상품 찾기
  //   static async findByItemId({ itemId }) {
  //     const item = await wishItemModel.findOne({ $and: [{ itemId }, { deleted: false }] });
  //     return item;
  //   }

  // 좋아요 -> 관심상품 등록
  static async addLike({ newItem }) {
    const createNewWishItem = await wishItemModel.create(newItem);
    return createNewWishItem;
  }

  // 좋아요 삭제 -> 관심상품 해제
  static async deleteLike({ deleteItem }) {
    const deleteWishItem = await wishItemModel.deleteOne(deleteItem);
    return deleteWishItem;
    //     const filter = { itemId: itemId,like: { $gt: 0 }  };
    //     const update = {
    //       $inc: { like: -1 },
    //     };
    //     const option = { returnOriginal: false };

    //     const DeleteLike = await wishItemModel.findOneAndUpdate(filter, update, option);
    //     return DeleteLike;
  }
}

export { wishItem };

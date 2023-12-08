import { ItemModel } from '../schemas/item.js';
const ObjectId = require('mongoose').Types.ObjectId;

class Item {
  // 새로운 아이템 생성
  static async createItem({ newItem }) {
    const createdNewItem = await ItemModel.create(newItem);
    return createdNewItem;
  }

  // 아이템 아이디로 찾기
  static async findByItemId({ itemId }) {
    const item = await ItemModel.findOne({ $and: [{ _id: itemId }, { deleted: false }] });
    return item;
  }

  // 아이템 카테고리로 찾기
  static async findItemsByCategory({ category }) {
    const item = await ItemModel.find({ $and: [{ category: category }, { deleted: false }] });
    return item;
  }

  // like 많은 순으로 아이템 조회
  static async findItemsByLikes({ likeCount }) {
    const items = await ItemModel.find({}).sort({ like: -1 }).limit(16);
    return items;
  }

  // 검색으로 아이템 찾기
  static async findItemsBySearch({ searchItem }) {
    // function escapeRegExp(string) {
    //   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $&는 일치하는 전체 문자열을 나타냅니다.
    // }
    const searchTermRegex = new RegExp(`.*${searchItem}.*`, 'i');

    const items = await ItemModel.find(
      {
        $or: [
          { title: { $regex: searchTermRegex } },
          { category: { $regex: searchTermRegex } },
          { description: { $regex: searchTermRegex } },
        ],
        deleted: false,
      }
      // { score: { $meta: 'textScore' }, deleted: false }
    ).sort({ createdAt: -1 });

    if (items.length > 0) {
      return items;
    }

    return items;
  }

  // 커서 기반 페이지 조회
  static async findCursor({ cursor, limit }) {
    if (cursor === '') {
      const items = await ItemModel.find({ deleted: false }).sort({ _id: -1 }).limit(Number(limit));
      return items;
    } else {
      const items = await ItemModel.find({ _id: cursor }, { deleted: false }).sort({ _id: -1 }).limit(Number(limit));
      return items;
    }
  }

  //null이 들어오면 보여주는 값
  static async findFirstItems({ limit }) {
    const items = await ItemModel.find({ deleted: false }).sort({ _id: -1 }).limit(Number(limit));
    return items;
  }

  //userId로 아이템 찾기
  static async findUserItems({ userId }) {
    const items = await ItemModel.findOne({ userId });
    return items;
  }

  // 아이템 수정
  static async update({ itemId, fieldToUpdate, newValue }) {
    const filter = { _id: new ObjectId(itemId) };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedItem = await ItemModel.findOneAndUpdate(filter, update, option);
    return updatedItem;
  }

  // 관심상품 추가
  static async likeUpdate({ itemId }) {
    const filter = { _id: new ObjectId(itemId) };
    const update = {
      $inc: { like: 1 },
    };
    const option = { returnOriginal: false };
    const updatedItem = await ItemModel.findOneAndUpdate(filter, update, option);
    return updatedItem;
  }

  // 관심상품 삭제
  static async likeDelete({ itemId }) {
    const filter = { _id: new ObjectId(itemId), like: { $gt: 0 } };
    const update = {
      $inc: { like: -1 },
    };
    const option = { returnOriginal: false };
    const deleteItem = await ItemModel.findOneAndUpdate(filter, update, option);
    return deleteItem;
  }

  // 아이템 삭제
  static async deleteItem({ itemId }) {
    const filter = { _id: itemId };
    // deleted 필드를 true로 업데이트하여 Soft delete 표시
    const update = { $set: { deleted: true } };
    const option = { returnOriginal: false };

    // Mongoose의 findOneAndUpdate 메서드를 사용하여 아이템을 소프트 삭제로 표시
    const deletedItem = await ItemModel.findOneAndUpdate(filter, update, option);
    if (!deletedItem) {
      throw new Error('아이템을 찾을 수 없거나 권한이 없습니다.');
    }
    return {};
  }
}

export { Item };

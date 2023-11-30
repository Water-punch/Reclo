import { ItemModel } from '../schemas/item';
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

  // 전체 조회
  static async findAll({}) {
    const items = await ItemModel.find({ deleted: false }).sort({ createdAt: 'asc' });
    // const sortedItems = items
    //   .map(({ ...rest }) =>
    //     [rest._doc].map(
    //       ({ userId, price, description, category, state, email, createdAt, updatedAt, __v, ...rest }) => rest
    //     )
    //   )
    //   .flat();
    return items;
  }

  // // userId로 아이템 찾기
  // static async findByUserId({ userId }) {
  //   const items = await ItemModel.findAll({ userId: ObjectId(userId) });
  //   return items;
  // }

  static async update({ itemId, fieldToUpdate, newValue }) {
    const filter = { _id: ObjectId(itemId) };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedItem = await ItemModel.findOneAndUpdate(filter, update, option);
    return updatedItem;
  }

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

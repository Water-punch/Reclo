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
    const item = await ItemModel.findById({ _id: ObjectId(itemId) });
    return item;
  }

  // 전체 조회
  static async findAll({}) {
    const items = await ItemModel.find({}).sort({ createdAt: 'asc' });
    const sortedItems = items
      .map(({ ...rest }) =>
        [rest._doc].map(
          ({ userId, price, description, category, state, email, createdAt, updatedAt, __v, ...rest }) => rest
        )
      )
      .flat();
    return sortedItems;
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

  static async delete({ itemId }) {
    const result = await ItemModel.findOneAndDelete({ _id: ObjectId(itemId) });
    return result;
  }
}

export { Item };

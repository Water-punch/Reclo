import { ItemModel } from "../schemas/item";
const ObjectId = require("mongoose").Types.ObjectId;

class Item {
  static async create({ newItem }) {
    const createdNewItem = await ItemModel.create(newItem);
    return createdNewItem;
  }

  static async checkItemId({ itemId }) {
    const item = await ItemModel.findOne({ _id: ObjectId(itemId) });
    return item;
  }

  static async findAll({ userId }) {
    // ItemModel에서 주어진 userId에 해당하는 모든 아이템을 거래글 생성일 순으로 정렬해서 찾기
    const items = await ItemModel.find({ userId }).sort({ createdAt: "asc" });
    const sortedItems = items
      .map(({ ...rest }) =>
        [rest._doc].map(
          ({
            userId,
            price,
            description,
            category,
            createdAt,
            updatedAt,
            __v,
            ...rest
          }) => rest
        )
      )
      .flat();
    return sortedItems;
  }

  static async findByItemId({ itemId }) {
    const item = await ItemModel.findOne({ _id: ObjectId(itemId) });
    return item;
  }

  static async update({ itemId, fieldToUpdate, newValue }) {
    const filter = { _id: ObjectId(itemId) };
    const update = { [fieldToUpdate]: newValue };
    const option = { new: true };
    const updatedItem = await ItemModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedItem;
  }

  static async delete({ itemId }) {
    const result = await ItemModel.findOneAndDelete({ _id: ObjectId(itemId) });
    return result;
  }
}

export { Item };

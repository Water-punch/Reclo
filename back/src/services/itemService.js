import { Item } from '../db';
// const { ObjectId } = require('mongodb');

class itemService {
  // 아이템 상세내용 조회
  static async getItemDetails({ itemId }) {
    const item = await Item.findByItemId({ itemId });
    return item;
  }

  // 전체 아이템 조회
  static async getAllItems() {
    const items = await Item.findAll({});
    return items;
  }

  // 유저별 아이템 조회
  static async getUserItems({ userId }) {
    const items = await Item.findAll({ userId });
    return items;
  }

  // 카테고리별 아이템 조회
  static async getItemsByCategory({ category }) {
    const items = await Item.findItemsByCategory({ category });
    return items;
  }

  // 검색으로 아이템 조회
  static async getItemsBySearch({ search }) {
    const items = await Item.findItemsBySearch({ search });
    return items;
  }

  // 아이템 추가
  static async addItem({ itemInfo }) {
    // console.log(itemInfo);
    const newItem = { ...itemInfo };
    const createdNewItem = await Item.createItem({ newItem });
    return createdNewItem;
  }

  //아이템 수정
  static async setItem({ itemId, toUpdate }) {
    let item = await Item.findByItemId({ itemId });
    // console.log(item);

    if (!item) {
      const errorMessage = '해당 id의 상품이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const itemFieldMapping = {
      title: 'title',
      description: 'description',
      category: 'category',
      price: 'price',
      state: 'state',
      itemsImgUrl: 'itemsImgUrl',
    };

    let updatedItem = {};

    for (const [field, fieldToUpdate] of Object.entries(itemFieldMapping)) {
      console.log(toUpdate[field]);
      if (toUpdate[field]) {
        const newValue = toUpdate[field];

        updatedItem = await Item.update({ itemId, fieldToUpdate, newValue });
      }
    }

    return updatedItem;
  }

  static async deleteItem({ itemId }) {
    const result = await Item.delete({ itemId });
    return result;
  }
}

export { itemService };

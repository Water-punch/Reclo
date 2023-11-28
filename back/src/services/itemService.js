import { Item } from '../db';

class itemService {
  // 아이템 상세내용 조회
  static async getItemDetails({ itemId }) {
    const user = await Item.getItemDetails({ itemId });
    return user;
  }

  // 전체 아이템 조회
  static async getAllItems() {
    const items = await Item.findAll();
    return items;
  }

  // 유저별 아이템 조회
  static async getUserItems({ userId }) {
    const item = await Item.findByItemId({ userId });
    return item;
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
    const newItem = { ...itemInfo };
    const createdNewItem = await Item.create({ newItem });
    return createdNewItem;
  }

  static async setItem({ itemId, toUpdate }) {
    // console.log('Service_itemId', itemId);
    let item = await Item.findByItemId({ itemId });

    // DB에서 찾지 못한 경우, 에러 메시지 반환
    if (!item) {
      const errorMessage = '해당 아이템이 존재하지 않습니다';
      return { errorMessage };
    }

    const updateFields = [
      'itemTitle',
      'itemName',
      'itemDescription',
      'itemImgUrl',
      'itemCategory',
      'itemLike',
      'itemPrice',
      'itemState',
    ];

    // 아이템 상세내용 업데이트
    for (const field of updateFields) {
      if (toUpdate[field] !== undefined) {
        const fieldToUpdate = field;
        const newValue = toUpdate[field];
        item = await Item.update({ itemId, fieldToUpdate, newValue });
      }
    }

    return item;
  }

  static async deleteItem({ itemId }) {
    const result = await Item.delete({ itemId });
    return result;
  }
}

export { itemService };

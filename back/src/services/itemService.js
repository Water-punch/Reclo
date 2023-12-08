import { Item } from '../db';
// const { ObjectId } = require('mongodb');
import { BadRequestError, INVALID_ITEM_Error } from '../utils/customError.js';

class itemService {
  // 아이템 상세내용 조회
  static async getItemDetails({ itemId }) {
    const item = await Item.findByItemId({ itemId });
    if (!item) {
      throw new INVALID_ITEM_Error('해당 상품이 존재하지 않습니다.');
    }
    return item;
  }

  // 커서 기반 페이지 조회
  static async getCursorItems({ itemCursor, limit }) {
    const cursor = itemCursor ? { $lte: itemCursor } : '';
    const items = await Item.findCursor({ cursor, limit });
    if (!items) {
      throw new INVALID_ITEM_Error('현재 위치의 아이템이 존재하지 않습니다.');
    }
    const newCursor = items.length > 1 ? items[items.length - 1]._id : null;
    return { items, cursor: newCursor };
  }

  // 유저별 아이템 조회
  static async getUserItems({ userId }) {
    const items = await Item.findUserItems({ userId });
    if (!items) {
      throw new INVALID_ITEM_Error('해당 유저의 상품이 존재하지 않습니다.');
    }
    return items;
  }

  // 카테고리별 아이템 조회
  static async getItemsByCategory({ category }) {
    const items = await Item.findItemsByCategory({ category });
    if (!items) {
      throw new INVALID_ITEM_Error('해당 카테고리의 상품이 존재하지 않습니다.');
    }
    return items;
  }

  // 검색으로 아이템 조회
  static async getItemsBySearch({ searchItem }) {
    const items = await Item.findItemsBySearch({ searchItem });
    if (!items) {
      throw new INVALID_ITEM_Error('해당 검색어와 관련된 상품이 존재하지 않습니다.');
    }
    return items;
  }

  // like 많은 순으로 아이템 조회
  static async getMostLiked({ likeCount }) {
    const items = await Item.findItemsByLikes({ likeCount });
    if (!items) {
      throw new INVALID_ITEM_Error('좋아요 개수로 조회한 상위 상품들이 존재하지 않습니다.');
    }
    return items;
  }
  // 아이템 등록
  static async addItem({ itemInfo, userId }) {
    const newItem = { ...itemInfo };
    const createdNewItem = await Item.createItem({ newItem, userId });
    if (!createdNewItem) {
      throw new BadRequestError('해당 상품이 등록되지 않았습니다.');
    }
    return createdNewItem;
  }

  //아이템 수정
  static async setItem({ itemId, toUpdate }) {
    const item = await Item.findByItemId({ itemId });

    if (!item) {
      throw new BadRequestError('해당 상품의 수정사항이 반영되지 않았습니다.');
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
      if (toUpdate[field]) {
        const newValue = toUpdate[field];

        updatedItem = await Item.update({ itemId, fieldToUpdate, newValue });
      }
    }

    return updatedItem;
  }

  // 아이템 삭제
  static async deleteById({ itemId }) {
    const deletedItem = await Item.deleteItem({ itemId });
    if (!deletedItem) {
      throw new BadRequestError('해당 상품이 삭제되지 않았습니다.');
    }
    return deletedItem;
  }
}

export { itemService };

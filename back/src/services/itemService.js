import { Item } from "../db"; 


class itemAuthService {
    static async addItem( itemInfo ) {
      const newItem = { ...itemInfo };
      const createdNewItem = await Item.create({ newItem });
      return createdNewItem;
    };
  
    static async checkItem({ itemId }) {
      const user = await Item.checkItemId({ itemId });
      return user;
    };
  
    static async getItems() {
      const items = await Item.findAll();
      return items;
    };
  
    static async getItemByItemId({ itemId }) {
      const item = await Item.findByItemId({ itemId });
      return item;
    };
  
    static async setItem({ itemId, toUpdate }) {
      console.log('Service_itemId', itemId)
      let item = await Item.findByItemId({ itemId });
  
      // DB에서 찾지 못한 경우, 에러 메시지 반환
      if (!item) {
        const errorMessage = "해당 프로젝트가 존재하지 않습니다";
        return { errorMessage };
      }
  

      const updateFields = [
        "itemTitle",
        "itemName",
        "itemDescription",
        "itemImgUrl",
        "itemCategory",
        "itemLike",
        "itemPrice",
        "itemState",
      ];


      // 업데이트 대상에 itemName이 있다면 업데이트 진행
      if (toUpdate.itemTitle) {
        const fieldToUpdate = "itemTitle";
        const newValue = toUpdate.itemTitle;
        item = await Item.update({ itemId, fieldToUpdate, newValue });
      }

      for (const field of updateFields) {
        if (toUpdate[field] !== undefined) {
          item = await Item.update({ itemId, fieldToUpdate: field, newValue: toUpdate[field] });
        }
      }
  
      return item;
    }
  

    //   if (toUpdate.itemName) {
    //     const fieldToUpdate = "itemName";
    //     const newValue = toUpdate.itemName;
    //     item = await Item.update({ itemId, fieldToUpdate, newValue });
    //   }
  
    //   if (toUpdate.itemDescription) {
    //     const fieldToUpdate = "itemDescription";
    //     const newValue = toUpdate.itemDescription;
    //     item = await Item.update({ itemId, fieldToUpdate, newValue });
    //   }
  
    //   if (toUpdate.itemImgUrl) {
    //     const fieldToUpdate = "itemImgUrl";
    //     const newValue = toUpdate.itemImgUrl;
    //     item = await Item.update({ itemId, fieldToUpdate, newValue });
    //   }
  
    //   if (toUpdate.itemCategory) {
    //     const fieldToUpdate = "itemCategory";
    //     const newValue = toUpdate.itemCategory;
    //     item = await Item.update({ itemId, fieldToUpdate, newValue });
    //   }

    //   if (toUpdate.itemLike) {
    //     const fieldToUpdate = "itemLike";
    //     const newValue = toUpdate.itemLike;
    //     item = await Item.update({ itemId, fieldToUpdate, newValue });
    //   }

    //   if (toUpdate.itemPrice) {
    //     const fieldToUpdate = "itemPrice";
    //     const newValue = toUpdate.itemPrice;
    //     item = await Item.update({ itemId, fieldToUpdate, newValue });
    //   }

    //   if (toUpdate.itemState) {
    //     const fieldToUpdate = "itemState";
    //     const newValue = toUpdate.itemState;
    //     item = await Item.update({ itemId, fieldToUpdate, newValue });
    //   }

    //   return item;
    // }
  
    static async deleteItem({ itemId }) {
      const result = await Item.delete({ itemId });
      return result;
    }
  }
  
  export { itemAuthService };
  

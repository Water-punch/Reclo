const ObjectId = require('mongoose').Types.ObjectId;
const { NotFoundError } = require('../middlewares/errorMiddleware');
const { itemAuthService } = require('../services/itemService');
const { imageUploader, imageDelete } = require("../middlewares/imageMiddleware");


// 전체 품목 조회
async function getAllItems(req, res, next) {
    try {
      const items = await itemAuthService.getItems();
  
      if (!items) {
        throw new NotFoundError("전체 아이템을 가져올 수 없습니다.");
      }
  
      res.status(200).send({ items });
    } catch (error) {
      next(error);
    }
  }


  // 유저별 품목 조회
async function getUserItems(req, res, next) {
    try {
      const userId = ObjectId(req.params.userId);
      const items = await itemAuthService.getItems({ userId });
  
      if (!items) {
        throw new NotFoundError("유저 아이템을 가져올 수 없습니다.");
      }
  
      res.status(200).send({ items });
    } catch (error) {
      next(error);
    }
  }



  // 아이템 상세내용 조회
async function getItemDetails(req, res, next) {
    try {
      const itemId = ObjectId(req.params.itemId);
      const itemDetails = await itemAuthService.getItemDetails({ itemId });
  
      if (!itemDetails) {
        throw new NotFoundError("아이템의 상세정보를 가져올 수 없습니다.");
      }
  
      res.status(200).send({ itemDetails });
    } catch (error) {
      next(error);
    }
  }
  
  // 아이템 추가하기
  async function addItem(req, res, next) {
    try {
      const userId = ObjectId(req.params.userId);
    
      // 이미지 업로드
      imageUploader.array("image")(req, res, async function (err) {
        if (err) {
          return next(err);
        }
      
      const itemImgUrl = req.files[0].location;
  
      const { itemTitle, itemName, itemDescription, itemCategory, itemLike, itemPrice, itemState } = req.body;
      const newItem = await itemAuthService.addItem({ 
        userId, 
        itemTitle, 
        itemName, 
        itemDescription, 
        itemImgUrl, 
        itemCategory, 
        itemLike, 
        itemPrice, 
        itemState 
    });
  
      if (!newItem) {
        throw new NotFoundError("해당 아이템이 생성되지 않았습니다.");
      }
  
      res.status(201).send({
        itemId: newItem._id,
        itemImgUrl: newItem.itemImgUrl,
        message: "아이템 추가에 성공했습니다."
      });
    });
    } catch (error) {
      next(error);
    }
  }
  
  // 아이템 수정하기
  async function setItem(req, res, next) {
    try {
      const itemId = ObjectId(req.params.itemId);
      const { itemTitle, itemName, itemDescription, itemImgUrl, itemCategory, itemLike, itemPrice, itemState } = req.body;
      const toUpdate = { itemTitle, itemName, itemDescription, itemImgUrl, itemCategory, itemLike, itemPrice, itemState };
  
      const updatedItem = await itemAuthService.setItem({ itemId, toUpdate });
  
      if (!updatedItem) {
        throw new NotFoundError("해당 아이템이 수정되지 않았습니다.");
      }
  
      res.status(200).send({
        itemImgUrl: updatedItem.itemImgUrl,
        message: "아이템 수정에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  }
  
  // 아이템 삭제하기
  async function deleteItem(req, res, next) {
    const itemId = ObjectId(req.params.itemId);
  
    try {

        const deleteImageAndItem = await Promise.all([
            imageDelete({ imageUrl: item.itemImgUrl }),
            itemAuthService.deleteItem({ itemId }),
          ]);

        const [deleteImageResult, deleteItemResult] = deleteImageAndItem;


    //   const deleteItem = await itemAuthService.deleteItem({ itemId });
    //   // 이미지 URL까지 같이 삭제
    //   const deleteImage = await imageDelete({ imageUrl: deleteItem.itemImgUrl });
  
      if (!deleteItemResult) {
        throw new NotFoundError("해당 아이템 정보가 삭제되지 않았습니다.");
      }
  
      if (!deleteImageResult) {
        throw new NotFoundError("해당 아이템 이미지가 삭제되지 않았습니다.");
      }

      res.status(200).send({
        message: "아이템 삭제에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = {
    getAllItems,
    getUserItems,
    getItemDetails,
    addItem,
    setItem,
    deleteItem,
  };
  
  
  
  
  
  
  
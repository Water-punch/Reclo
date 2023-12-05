import { ImageModel } from '../schemas/image.js';
import { ItemModel } from '../schemas/item.js';
import { BadRequestError, INVALID_IMAGE_Error, INVALID_ITEM_Error } from '../../utils/customError.js';

class Image {
  // 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
  static async createItem({ newImage, imageUrl }) {
    const findItem = await ItemModel.findOne({ _id: newImage.itemId });
    if (!findItem) {
      throw new INVALID_ITEM_Error('해당 이미지에 해당하는 아이템을 찾을 수 없습니다.');
    }
    // image collection에 newImage 추가
    const createdImage = await ImageModel.create(newImage);
    // item collection imageUrl 필드에 imageUrl을 배열로 추가
    await ItemModel.findOneAndUpdate(
      { _id: newImage.itemId },
      { $addToSet: { itemsImgUrl: imageUrl } },
      { new: true, upsert: true }
    );
    return createdImage;
  }

  // imageId로 이미지 확인
  static async findByImageId({ imageId }) {
    const image = await ImageModel.findOne({ $and: [{ _id: imageId }, { deleted: false }] });
    return image;
  }

  // imageId로 이미지 확인
  static async findByItemId({ itemId }) {
    const image = await ImageModel.find({ $and: [{ itemId }, { deleted: false }] });
    return image;
  }

  // 아이템 이미지 수정
  static async updateImage({ imageId, updateImg }) {
    const updatedImage = await ImageModel.findOneAndUpdate(
      { _id: imageId },
      { imageId, fileName: updateImg.fileName, path: updateImg.path, imageUrl: updateImg.imageUrl },
      { new: true }
    );
    const updatedImages = await ImageModel.findByItemId({ itemId: updateImg.itemId });

    console.log(updatedImages);

    await ItemModel.findOneAndUpdate(
      { itemId: updateImg.itemId },
      { $set: { itemsImgUrl: updatedImages.map((imageUrl) => imageUrl) } },
      { new: true }
    );

    return updatedImage;
  }

  // 이미지 삭제
  static async deleteImage(imageId, imageUrl) {
    const delImage = await ImageModel.findOneAndUpdate({ _id: imageId }, { $set: { deleted: true } }, { new: true });
    await ItemModel.findOneAndUpdate(
      { itemsImgUrl: imageUrl },
      { $pull: { itemsImgUrl: ['imageUrl'] } },
      { new: true }
    );
    return delImage;
  }

  // static async find(itemId) {
  //   const images = await ImageModel.find(itemId);
  //   return images;
  // }
  // static async findAll() {
  //   const images = await ImageModel.find();
  //   return images;
  // }
  // static async findById(imageId) {
  //   const imageId = await ImageModel.findById({ _id: imageId });
  //   return imageId;
  // }
  // //
  // static async findAllByUserId(userId) {
  //   const userImages = await ImageModel.find(userId);
  //   return userImages;
  // }
}

export { Image };

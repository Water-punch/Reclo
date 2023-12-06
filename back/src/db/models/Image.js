const ObjectId = require('mongoose').Types.ObjectId;
import { ImageModel } from '../schemas/image.js';
import { ItemModel } from '../schemas/item.js';
import { UserModel } from '../schemas/user.js';

import { BadRequestError, INVALID_IMAGE_Error, INVALID_ITEM_Error } from '../../utils/customError.js';

class Image {
  // 이미지 업로드 후 응답을 받으면 데이터베이스에 아이템 이미지 정보 저장
  static async createItemImage({ newImage, imageUrl }) {
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

  // 아이템 이미지 수정
  static async updateImage({ imageId, updateImg }) {
    const updatedImage = await ImageModel.findOneAndUpdate(
      { _id: imageId, deleted: false },
      { imageId, fileName: updateImg.fileName, path: updateImg.path, imageUrl: updateImg.imageUrl },
      { new: true }
    );
    const updatedImages = await ImageModel.find({ itemId: updateImg.itemId });

    const updatedURL = updatedImages.map((url) => url.imageUrl);

    await ItemModel.findOneAndUpdate({ _id: updateImg.itemId }, { $set: { itemsImgUrl: updatedURL } }, { new: true });

    return updatedImage;
  }

  // 이미지 삭제
  static async deleteImage({ imageId }) {
    const delImage = await ImageModel.findOneAndUpdate({ _id: imageId }, { $set: { deleted: true } }, { new: true });
    const delUrl = delImage.imageUrl;
    await ItemModel.findOneAndUpdate(
      { itemsImgUrl: delImage.imageUrl },
      { $pull: { itemsImgUrl: delUrl } },
      { new: true }
    );
    return delImage;
  }

  // 이미지 업로드 후 응답을 받으면 데이터베이스에 유저 이미지 정보 저장
  static async createUserImage({ newImage, imageUrl }) {
    console.log(newImage.userId);
    const findUser = await UserModel.findOne({ _id: newImage.userId });

    if (!findUser) {
      throw new INVALID_ITEM_Error('해당 유저를 찾을 수 없습니다.');
    }
    // image collection에 newImage 추가
    const createdImage = await ImageModel.create(newImage);
    // item collection imageUrl 필드에 imageUrl을 배열로 추가
    await UserModel.findOneAndUpdate(
      { _id: newImage.userId },
      { $addToSet: { userImgUrl: imageUrl } },
      { new: true, upsert: true }
    );
    return createdImage;
  }

  // 유저 이미지 수정
  static async updateImage({ imageId, updateImg }) {
    const updatedImage = await ImageModel.findOneAndUpdate(
      { _id: imageId },
      { imageId, fileName: updateImg.fileName, path: updateImg.path, imageUrl: updateImg.imageUrl },
      { new: true }
    );

    await UserModel.findOneAndUpdate(
      { _id: updateImg.userId },
      { $set: { userImgUrl: updateImg.imageUrl } },
      { new: true }
    );

    return updatedImage;
  }

  // S3에 유저 이미지 삭제를 위한 image url 요청
  static async getdelUrl({ imageId }) {
    const user = await ImageModel.find({ _id: imageId });
    const imageUrl = user[0].imageUrl;
    return imageUrl;
  }

  //S3에서 이미지 삭제 후 DB에 저장된 유저 이미지 삭제
  static async delUserImage({ imageId }) {
    const findUserImage = await ImageModel.findOne({ _id: imageId });
    const deleteUrl = findUserImage.imageUrl;

    const userImageDelete = await ImageModel.deleteOne({ _id: imageId });
    await UserModel.findOneAndUpdate(
      { _id: findUserImage.userId },
      { $pull: { userImgUrl: deleteUrl[0] } },
      { new: true }
    );

    return userImageDelete;
  }
}

export { Image };

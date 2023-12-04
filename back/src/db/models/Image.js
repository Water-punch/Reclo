import { ImageModel } from '../schemas/image.js';

class Image {
  static async createItem({ newImage }) {
    const createdImage = await ImageModel.create(newImage);
    return createdImage;
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
  // // 아이템 이미지 수정
  // static async updateImage({ imageId, filename, path }) {
  //   const updatedImage = await ImageModel.findOneAndUpdate(
  //     { _id: imageId },
  //     { imageId, filename, path },
  //     { new: true }
  //   );
  //   return updatedImage;
  // }
  // // 이미지 삭제
  // static async deleteImage(imageId) {
  //   await ImageModel.findByIdAndDelete({ _id: imageId });
  //   return;
  // }
}

export { Image };

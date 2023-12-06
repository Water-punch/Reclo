import AWS from 'aws-sdk';
import { Image } from '../db';
const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME, S3_REGION } = process.env;
import { BadRequestError, INVALID_IMAGE_Error } from '../utils/customError';

AWS.config.update({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const bucketName = process.env.S3_BUCKET_NAME;
const signedUrlExpireSeconds = 60 * 5;

class imageService {
  // 아이템 이미지 업로드를 위한 presigned URL 요청
  static async createItemPresignedUrl(fileName) {
    const url = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: `upload/itemImage/${fileName}`,
      Expires: signedUrlExpireSeconds,
      ContentType: 'image/*',
    });

    if (!url) {
      throw new INVALID_IMAGE_Error('해당 이미지의 Presinged Url이 발급되지 않았습니다.');
    }
    return url;
  }

  // 유저 이미지 업로드를 위한 presigned URL 요청
  static async createUserPresignedUrl(fileName) {
    const url = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: `upload/userImage/${fileName}`,
      Expires: signedUrlExpireSeconds,
      ContentType: 'image/*',
    });

    if (!url) {
      throw new INVALID_IMAGE_Error('해당 이미지의 Presinged Url이 발급되지 않았습니다.');
    }
    return url;
  }

  // 아이템 이미지
  // 아이템 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
  static async uploadImage({ imageInfo }) {
    const newImage = { ...imageInfo };
    const createImageData = await Image.createItemImage({ newImage, imageUrl: imageInfo.imageUrl });
    if (!createImageData) {
      throw new BadRequestError('해당 상품이 등록되지 않았습니다.');
    }
    return createImageData;
  }

  // 아이템 이미지 수정
  static async updateItemImage({ imageId, toUpdate }) {
    const image = await Image.findByImageId({ imageId });
    if (!image) {
      throw new INVALID_IMAGE_Error('해당 이미지가 존재하지 않습니다.');
    }
    const updatedImage = await Image.updateImage({ imageId, updateImg: toUpdate });

    return updatedImage;
  }

  // 아이템 이미지 삭제
  static async deleteItemImage({ imageId }) {
    const deletedItemImage = await Image.deleteImage({ imageId });
    if (!deletedItemImage) {
      throw new BadRequestError('해당 상품이 삭제되지 않았습니다.');
    }
    return deletedItemImage;
  }

  // 유저 이미지
  //유저 이미지 추가
  static async uploadImage({ imageInfo }) {
    const newImage = { ...imageInfo };
    // console.log(newImage);
    const createImageData = await Image.createUserImage({ newImage, imageUrl: newImage.imageUrl });
    if (!createImageData) {
      throw new BadRequestError('해당 상품이 등록되지 않았습니다.');
    }
    return createImageData;
  }

  // 유저 이미지 수정
  static async updateUserImage({ imageId, toUpdate }) {
    const image = await Image.findByImageId({ imageId });
    if (!image) {
      throw new INVALID_IMAGE_Error('해당 유저의 이미지가 존재하지 않습니다.');
    }
    const updatedImage = await Image.updateImage({ imageId, updateImg: toUpdate });

    return updatedImage;
  }

  // S3에 유저 이미지 삭제를 위한 image url 요청
  // 프론트에서 image url과 bucket name 만 있으면 된다.
  static async getdeleteUrl({ imageId }) {
    const deleteImage = await Image.getdelUrl({ imageId });

    if (!deleteImage) {
      throw new INVALID_IMAGE_Error('삭제 요청한 유저 이미지가 존재하지 않습니다.');
    }
    return deleteImage;
  }

  //S3에서 이미지 삭제 후 DB에 저장된 유저 이미지 삭제
  static async deleteUserImage({ imageId }) {
    const deletedUserImage = await Image.delUserImage({ imageId });
    if (!deletedUserImage) {
      throw new BadRequestError('해당 유저의 이미지가 삭제되지 않았습니다.');
    }
    return deletedUserImage;
  }
}

export { imageService };

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

  // 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
  static async uploadItemImage({ imageInfo }) {
    const newImage = { ...imageInfo };
    const createImageData = await Image.createItem({ newImage });
    if (!createImageData) {
      throw new BadRequestError('해당 상품이 등록되지 않았습니다.');
    }
    return createImageData;
  }

  // 이미지 조회
  //   static async getItemDetails({ itemId }) {
  //     const item = await Image.findByItemId({ itemId });
  //     if (!item) {
  //       throw new INVALID_ITEM_Error('해당 상품이 존재하지 않습니다.');
  //     }
  //     return item;
  //   }

  //이미지 추가
  //   static async addItem({ itemInfo }) {
  //     const newItem = { ...itemInfo };
  //     const createdNewItem = await Image.createItem({ newItem });
  //     if (!createdNewItem) {
  //       throw new BadRequestError('해당 상품이 등록되지 않았습니다.');
  //     }
  //     return createdNewItem;
  //   }
  //이미지 수정

  //이미지 삭제
  //   static async deleteById({ itemId }) {
  //     const deletedItem = await Image.deleteItem({ itemId });
  //     if (!deletedItem) {
  //       throw new BadRequestError('해당 상품이 삭제되지 않았습니다.');
  //     }
  //     return deletedItem;
  //   }
}

export { imageService };

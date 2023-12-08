import AWS from 'aws-sdk';
import { Image } from '../db';
import { v4 as uuidv4 } from 'uuid';
const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME, S3_REGION } = process.env;

import { BadRequestError, INVALID_IMAGE_Error } from '../utils/customError.js';
import { set } from 'mongoose';

const uuid = () => {
  const tokens = uuidv4().split('-');
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

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
      Key: `upload/itemImage/${uuid()}_${fileName}`,
      Expires: signedUrlExpireSeconds,
      ContentType: 'image/*',
      ACL: 'public-read',
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

  static async createChatPresignedUrl(fileName) {
    const url = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: `upload/chatImage/${uuid()}_${fileName}`,
      Expires: signedUrlExpireSeconds,
      ContentType: 'image/*',
    });

    if (!url) {
      throw new INVALID_IMAGE_Error('해당 이미지의 Presinged Url이 발급되지 않았습니다.');
    }
    return url;
  }

  // 아이템 이미지 업로드 후 응답을 받으면 데이터베이스에 이미지 정보 저장
  static async uploadImages({ ImgUrl }) {
    const createImageData = await Promise.all(
      ImgUrl.map(async (Url) => {
        const image = Image.createImage({ imageUrl: Url });
        return image;
      })
    );

    return createImageData;
  }

  static async uploadImage({ ImgUrl }) {
    const itemImage = await Image.createImage({ imageUrl: ImgUrl });
    return itemImage;
  }

  static async updateImages({ ImgUrl, newImgUrl }) {
    const deletedUrl = set(ImgUrl) - set(newImgUrl);
    const updatedUrl = set(newImgUrl) - set(ImgUrl);

    console.log('imageUpdate : ', deletedUrl, updatedUrl);
    // 사용하지 않는 url deleted처리
    const Images = await Promise.all(
      deletedUrl.map(async (Url) => {
        const image = Image.deleteImage({ imageUrl: Url });
        return image;
      })
    );

    // 새로 추가된 url deleted처리
    const updatedImages = await Promise.all(
      updatedUrl.map(async (Url) => {
        const image = Image.createImage({ imageUrl: Url });
        return image;
      })
    );

    //반환값 필요한가?
    return { Images, updatedImages };
  }

  static async updateImage({ ImgUrl, newImgUrl }) {
    if (!ImgUrl) {
      const updatedImage = await Image.createImage({ imageUrl: newImgUrl });
    } else if (ImgUrl !== newImgUrl) {
      // 사용하지 않는 url deleted처리
      const image = await Image.deleteImage({ imageUrl: ImgUrl });
      // 새로 추가된 url deleted처리
      const updatedImage = await Image.createImage({ imageUrl: newImgUrl });
    }

    //반환값 필요한가?
  }

  static async deleteImages({ ImgUrl }) {
    // 사용하지 않는 url deleted처리
    const Images = await Promise.all(
      ImgUrl.map(async (Url) => {
        const image = Image.deleteImage({ imageUrl: Url });
        return image;
      })
    );

    //반환값 필요한가?
    return Images;
  }

  static async deleteImage({ ImgUrl }) {
    // 사용하지 않는 url deleted처리
    const deletedImage = await Image.deleteImage({ imageUrl: ImgUrl });

    //반환값 필요한가?
    return deletedImage;
  }
}

export { imageService };

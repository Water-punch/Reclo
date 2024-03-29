import { Point } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { userAuthService } from './userService.js';
import { ConflictError } from '../utils/customError.js';

class pointService {
  static async getAllUserPoint({ userId }) {
    const points = await Point.findAll({ userId });

    return points;
  }
  static async addPoint({ pointdetails }) {
    const point = await Point.findone({ userId: pointdetails.userId, itemId: pointdetails.itemId });

    if (point != null) {
      throw new ConflictError('이미 존재하는 포인트입니다.');
    }

    const newPoint = await Point.create({ newPoint: pointdetails });

    if (newPoint !== null) {
      const user = userAuthService.addUserPoint({ userId: pointdetails.userId, point: pointdetails.point });
      if (!user) {
        throw new InternalServerError('포인트 정보 수정에 실패하였습니다.');
      }
      return user;
    }
  }
}

export { pointService };

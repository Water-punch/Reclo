import { Point } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { userAuthService } from './userService';

class pointService {
  static async getAllUserPoint({ userId }) {
    const points = await Point.findAll({ userId });

    return points;
  }
  static async addPoint({ pointdetails }) {
    const point = await Point.findone({ ids: pointdetails.ids });

    console.log(point);
    if (point != null) {
      const errorMessage = '포인트 내역이 이미 존재합니다.';
      return { errorMessage };
    }

    const newPoint = await Point.create({ newPoint: pointdetails });

    if (newPoint !== null) {
      const user = userAuthService.addUserPoint({ userId: pointdetails.ids.userId, point: pointdetails.point });

      if (user.errorMessage) {
        const errorMessage = user.errorMessage;
        return { errorMessage };
      }

      return user;
    }
  }
}

export { pointService };

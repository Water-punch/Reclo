import { PointModel } from '../schemas/point.js';

class Point {
  static async create({ newPoint }) {
    const createdNewPoint = await PointModel.create(newPoint);

    delete createdNewPoint._doc._id;
    return createdNewPoint;
  }

  static async findAll({ userId }) {
    // ItemModel에서 주어진 userId에 해당하는 모든 아이템을 거래글 생성일 순으로 정렬해서 찾기
    const points = await PointModel.find({ userId: userId }).select('-_id').sort({ createdAt: 'desc' });
    return points;
  }

  static async findone({ userId, itemId }) {
    const createdNewPoint = await PointModel.findOne({ userId, itemId }).select('-_id');
    return createdNewPoint;
  }
}

export { Point };

import { PointModel } from '../schemas/point';

class Point {
  static async create({ newPoint }) {
    const createdNewPoint = await PointModel.create(newPoint);
    return createdNewPoint;
  }

  static async findAll({ userId }) {
    // ItemModel에서 주어진 userId에 해당하는 모든 아이템을 거래글 생성일 순으로 정렬해서 찾기
    const points = await PointModel.find({ userId: userId }).sort({ createdAt: 'desc' });
    return points;
  }

  static async findone({ userId, itemId }) {
    const createdNewPoint = await PointModel.findOne({ userId, itemId });
    return createdNewPoint;
  }
}

export { Point };

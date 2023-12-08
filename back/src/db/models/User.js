import { UserModel } from '../schemas/user.js';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ $and: [{ email: email }, { deleted: null }] }).select('+password');
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ $and: [{ _id: userId }, { deleted: null }] });
    return user;
  }

  static async findByNickname({ nickname }) {
    const user = await UserModel.findOne({ $and: [{ nickname: nickname }, { deleted: null }] });
    return user;
  }

  static async update({ user }) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { $and: [{ _id: user._id }, { deleted: null }] },
      { ...user },
      { new: true }
    );

    return updatedUser;
  }

  static async incresePoint({ userId, point }) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { $and: [{ _id: userId }, { deleted: null }] },
      { $inc: { point: point } },
      { new: true }
    );

    return updatedUser;
  }
}

export { User };

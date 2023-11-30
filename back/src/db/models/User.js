import { UserModel } from '../schemas/user';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ $and: [{ email: email }, { deleted: false }] });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ $and: [{ _id: userId }, { deleted: false }] });
    return user;
  }

  static async findByNickname({ nickname }) {
    const user = await UserModel.findOne({ $and: [{ nickname: nickname }, { deleted: false }] });
    return user;
  }

  static async update({ user }) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { $and: [{ _id: user._id }, { deleted: false }] },
      { ...user },
      { new: true }
    );

    return updatedUser;
  }

  static async updatePoint({ userId, point }) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { $and: [{ _id: userId }, { deleted: false }] },
      { $set: { point: point } },
      { new: true }
    );

    return updatedUser;
  }
}

export { User };

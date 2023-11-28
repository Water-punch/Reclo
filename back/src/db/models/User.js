import { UserModel } from '../schemas/user';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ _id: userId });
    return user;
  }

  static async findByNickname({ nickname }) {
    const user = await UserModel.findOne({ nickname });
    return user;
  }

  static async update({ user }) {
    const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, { ...user }, { new: true });

    return updatedUser;
  }

  static async updatePoint({ email, point }) {
    const updatedUser = await UserModel.findOneAndUpdate({ email }, { $set: { point: point } }, { new: true });

    return updatedUser;
  }
}

export { User };

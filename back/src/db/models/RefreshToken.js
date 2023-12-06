import { RefreshTokenModel } from '../schemas/refreshtoken.js';

class RefreshToken {
  static async create({ userId, token }) {
    const createdNewRefreshToken = await RefreshTokenModel.create({
      userId,
      token,
    });
    return createdNewRefreshToken;
  }

  static async findById({ tokenId }) {
    const refreshtoken = await RefreshTokenModel.findOne({ _id: tokenId });
    return refreshtoken;
  }
  static async findByIdAndDelete({ userId }) {
    await RefreshTokenModel.findOneAndDelete({ userId });
  }
}

export { RefreshToken };

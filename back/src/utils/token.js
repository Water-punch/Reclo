import jwt from 'jsonwebtoken';
const JWT_KEY = process.env.JWT_SECRET_KEY;
import { RefreshToken } from '../db';
import { UnauthorizedError } from './customError.js';
// accessToken 발급 함수
const makeToken = ({ user_id }) => {
  const token = jwt.sign({ user_id }, JWT_KEY, { expiresIn: '20m' });
  return token;
};

// refreshToken 발급 함수
const makeRefreshToken = async ({ user_id }) => {
  await RefreshToken.findByIdAndDelete({ userId: user_id });

  const token = jwt.sign({ user_id }, JWT_KEY, {
    algorithm: 'HS256',
    expiresIn: '200m',
  });

  const refreshToken = await RefreshToken.create({ userId: user_id, token });

  return refreshToken;
};

// access token 유효성 검사
const verify = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    return decoded;
  } catch (error) {
    throw new UnauthorizedError('잘못된 토큰입니다.');
  }
};

// refresh token 유효성 검사
const refreshVerify = async (tokenId) => {
  // db에 userId로 생성된 refresh token이 있는지 검사
  const refreshtoken = await RefreshToken.findById({ tokenId });
  //토큰이 존재하는 지 검사
  if (refreshtoken == null) {
    throw new UnauthorizedError('토큰이 존재하지 않습니다.');
  }

  // 토큰의 유효성 검사
  try {
    const decoded = jwt.verify(refreshtoken.token, JWT_KEY);
    return decoded;
  } catch (err) {
    // 토큰 자체의 유효성이 문제 있는 경우
    throw new UnauthorizedError('잘못된 토큰입니다.');
  }
};
export { makeToken, makeRefreshToken, verify, refreshVerify };

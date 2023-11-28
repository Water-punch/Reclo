import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { asyncHandler } from '../middlewares/asyncHandler';
import { userAuthService } from '../services/userService';

const userAuthRouter = Router();

userAuthRouter.post('/user/register', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const user = req.body.user;
    // req (request) 에서 데이터 가져오기
    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      user,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post('/user/login', async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // email과 password정보가 db와 일치하는지 확인
    // 로그인시 로그인한 유저의 정보와 토큰 생성
    const { token, refreshtoken, user, errorMessage } = await userAuthService.getUser({ email, password });

    // 토큰을 설정해줌
    res.cookie('accessToken', token, {
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
    });
    res.cookie('refreshToken', refreshtoken._id, {
      maxAge: 1000 * 60 * 200,
      httpOnly: true,
    });

    if (errorMessage) {
      throw new Error(errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get('/user/current', asyncHandler(login_required), async function (req, res, next) {
  try {
    // jwt토큰에서 추출된 사용자 이메일을 가지고 db에서 사용자 정보를 찾음.
    const userId = req.currentUserId;

    const currentUserInfo = await userAuthService.getUserInfobyId({
      userId,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.put('/user/current', asyncHandler(login_required), async function (req, res, next) {
  try {
    const userId = req.currentUserId;

    const user = req.body.user;

    // 해당 사용자 이메일로 사용자 정보를 db에서 찾아 업데이트함.
    const updatedUser = await userAuthService.setUser({ userId, user });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// 닉네임으로 유저정보 조회, 넘겨주는 데이터에서 개인정보와 관련된부분 없애야할 필요가 있을듯
userAuthRouter.get('/user/:nickname', asyncHandler(login_required), async function (req, res, next) {
  try {
    const user_nickname = req.params.nickname;
    const currentUserInfo = await userAuthService.getUserInfobyNickname({
      nickname: user_nickname,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get('/user/wishlist', asyncHandler(login_required), async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    // 자신의 이메일에서 위시리스트를 찾아서 반환
  } catch (error) {
    next(error);
  }
});

export { userAuthRouter };

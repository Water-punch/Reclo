const ObjectId = require('mongoose').Types.ObjectId;
const { userAuthService } = require('../services/userService.js');
const { pointService } = require('../services/pointService.js');
const { wishItemService } = require('../services/wishItemService.js');

async function register(req, res, next) {
  try {
    const user = req.body.user;
    // req (request) 에서 데이터 가져오기
    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      user,
    });

    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

async function resign(req, res, next) {
  try {
    const userId = req.currentUserId;
    await userAuthService.deleteUser({ userId });

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
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

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    // 토큰을 설정해줌
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

async function currentInfo(req, res, next) {
  try {
    // jwt access토큰에서 사용자의 id를 얻음.
    const userId = req.currentUserId;

    const currentUserInfo = await userAuthService.getUserInfobyId({
      userId,
    });

    res.status(200).json({ user: currentUserInfo });
  } catch (error) {
    next(error);
  }
}

async function currentInfoUpdate(req, res, next) {
  try {
    const userId = req.currentUserId;

    const user = req.body.user;

    // 해당 사용자 이메일로 사용자 정보를 db에서 찾아 업데이트함.
    const updatedUser = await userAuthService.setUser({ userId, user });

    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

//포인트 누적 정보 확인
async function currentPointInfo(req, res, next) {
  try {
    // jwt토큰에서 추출된 사용자 이메일을 가지고 db에서 사용자 정보를 찾음.
    const userId = req.currentUserId;

    const points = await pointService.getAllUserPoint({ userId });

    res.status(200).json({ points });
  } catch (error) {
    next(error);
  }
}

async function profileUpdate(req, res, next) {
  try {
    const userId = req.currentUserId;

    // 해당 사용자 이메일로 사용자 정보를 db에서 찾아 업데이트함.
    //const updatedUser = await userAuthService.setUserProfile({ userId, img });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
}

//
async function addPoint(req, res, next) {
  try {
    const pointdetails = req.body.pointdetails;
    // 해당 사용자 이메일로 사용자 정보를 db에서 찾아 업데이트함.

    const updatedUser = await pointService.addPoint({ pointdetails });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
}

// 닉네임으로 유저정보 조회, 넘겨주는 데이터에서 개인정보와 관련된부분 없애야할 필요가 있을듯
async function InfoByNickname(req, res, next) {
  try {
    const userNickname = req.params.nickname;
    const currentUserInfo = await userAuthService.getUserInfobyNickname({
      nickname: userNickname,
    });

    res.status(200).json({ user: currentUserInfo });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  resign,
  login,
  logout,
  currentInfo,
  currentInfoUpdate,
  currentPointInfo,
  profileUpdate,
  addPoint,
  InfoByNickname,
};

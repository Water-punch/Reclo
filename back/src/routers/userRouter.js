import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
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

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/user/current",
  //login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 이메일을 가지고 db에서 사용자 정보를 찾음.
      req.currentUserEmail = "mob1@email.com";
      const email = req.currentUserEmail;

      const currentUserInfo = await userAuthService.getUserInfobyEmail({
        email,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/user/current",
  //login_required,
  async function (req, res, next) {
    try {
      req.currentUserEmail = "mob1@email.com";
      const email = req.currentUserEmail;

      const user = req.body.user;

      // 해당 사용자 이메일로 사용자 정보를 db에서 찾아 업데이트함.
      const updatedUser = await userAuthService.setUser({ email, user });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

// 닉네임으로 유저정보 조회, 넘겨주는 데이터에서 개인정보와 관련된부분 없애야할 필요가 있을듯
userAuthRouter.get(
  "/user/:nickname",
  //login_required,
  async function (req, res, next) {
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
  }
);

userAuthRouter.put(
  "/users/current/point",
  //login_required,
  async function (req, res, next) {
    try {
      const email = req.currentUserEmail;
      const point = req.body.point;

      // 해당 사용자 이메일로 사용자 정보를 db에서 찾아 업데이트함.
      const updatedUser = await userAuthService.setUserPoint({ email, point });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/wishlist",
  login_required,
  async function (req, res, next) {
    try {
      const email = req.currentUserEmail;

      // 자신의 이메일에서 위시리스트를 찾아서 반환
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };

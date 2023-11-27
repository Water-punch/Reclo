import { makeToken, verify, refreshVerify } from "../util/token";

async function login_required(req, res, next) {
  // cookie에서 access token을 받음
  const userAccessToken = req.cookies.accessToken; // = req.cookies.accessToken;
  const userRefreshToken = req.cookies.refreshToken;

  //access token을 우선 검사함
  if (userAccessToken != null) {
    try {
      const jwtDecoded = verify(userAccessToken);

      if (jwtDecoded.ok == true) {
        const userId = jwtDecoded.decoded.user_id;
        req.currentUserId = userId;
      }
    } catch (error) {
      res
        .status(400)
        .send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    }
    next();
  }
  // access token이 없는경우 refreshtoken 검사, refreshtoken도 없는 경우 로그인 유지
  else if (userRefreshToken != null) {
    try {
      const jwtDecoded = await refreshVerify(userRefreshToken);
      // token이 유효한 경우 새로운 access token 생성하여 쿠키에 저장해줌
      if (jwtDecoded.ok == true) {
        const userId = jwtDecoded.decoded.user_id;
        req.currentUserId = userId;

        const token = makeToken({ user_id: userId });

        res.cookie("accessToken", token, {
          maxAge: 1000 * 60 * 20,
          httpOnly: true,
        });
      }

      //새로운 access token 생성
      next();
    } catch (error) {
      res
        .status(400)
        .send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    }
  } else {
    // token을 가지고 있지 않은 유저
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
  }
}

export { login_required };

import { makeToken, verify, refreshVerify } from '../utils/token';
import { UnauthorizedError } from '../utils/customError';

async function login_required(req, res, next) {
  // cookie에서 access token을 받음
  const userAccessToken = req.cookies.accessToken; // = req.cookies.accessToken;
  const userRefreshToken = req.cookies.refreshToken;

  //access token을 우선 검사함
  if (userAccessToken != null) {
    const jwtDecoded = verify(userAccessToken);

    const userId = jwtDecoded.user_id;
    req.currentUserId = userId;

    next();
  }

  // access token이 없는경우 refreshtoken 검사, refreshtoken도 없는 경우 로그인 유지
  else if (userRefreshToken != null) {
    const jwtDecoded = await refreshVerify(userRefreshToken);
    // token이 유효한 경우 새로운 access token 생성하여 쿠키에 저장해줌

    const userId = jwtDecoded.user_id;
    req.currentUserId = userId;

    const token = makeToken({ user_id: userId });

    res.cookie('accessToken', token, {
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
    });
    next();

    //새로운 access token 생성
  } else {
    // token을 가지고 있지 않은 유저
    throw new UnauthorizedError('잘못된 토큰입니다.');
  }
}

export { login_required };

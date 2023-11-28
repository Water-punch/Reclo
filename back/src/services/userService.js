import { User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from 'bcrypt';
import { makeToken, makeRefreshToken } from '../utils/token.js';

class userAuthService {
  // 회원가입 서비스
  static async addUser({ user }) {
    // 이메일 중복 확인

    const duplication = await User.findByEmail({ email: user.email });
    if (duplication) {
      const errorMessage = '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = { ...user, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  //로그인
  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });

    if (!user) {
      const errorMessage = '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
    if (!isPasswordCorrect) {
      const errorMessage = '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 토큰 생성

    const token = makeToken({ user_id: user._id });
    const refreshtoken = await makeRefreshToken({ user_id: user._id });

    // 반환할 loginuser 객체를 위한 변수 설정
    const loginUser = {
      token,
      refreshtoken,
      user,
      errorMessage: null,
    };

    return loginUser;
  }

  //유저정보 수정
  static async setUser({ userId, user }) {
    // 우선 해당 email 의 유저가 db에 존재하는지 여부 확인
    const duplication = await User.findById({ userId });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!duplication) {
      const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    const updateduser = {
      ...duplication._doc,
      ...user,
    };
    // user 업데이트 후 반환
    const updatedUser = await User.update({ user: updateduser });

    return updatedUser;
  }

  static async getUserInfobyId({ userId }) {
    const user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return user;
  }

  //닉네임을 이용해 유저의 정보를 얻을 수 있음
  static async getUserInfobyNickname({ nickname }) {
    const user = await User.findByNickname({ nickname });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return user;
  }
}

export { userAuthService };

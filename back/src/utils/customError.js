class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

// 400: 존재하지 않는 아이디, 이메일
class INVALID_USER_Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

// 400: 존재하지 않는 아이템
class INVALID_ITEM_Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

// 400: 존재하지 않는 아이템
class INVALID_IMAGE_Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

// 401: 권한 없음
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

// 403: 인증된 상태에서 권한이 없는 리소스에 접근
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

// 404: 찾고자 하는 Route가 존재하지 않음
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

// 409 중복된 요청 (예시. 중복 회원가입)
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

// 500 db저장중 문제 발생
class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

export {
  BadRequestError,
  INVALID_USER_Error,
  INVALID_ITEM_Error,
  INVALID_IMAGE_Error,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
export { InternalServerError };

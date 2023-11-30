import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { asyncHandler } from '../middlewares/asyncHandler';

const userController = require('../controllers/userContrloller');

const userAuthRouter = Router();

// 회원가입, 회원탈퇴
userAuthRouter.post('/user/register', userController.register);
userAuthRouter.post('/user/resign', asyncHandler(login_required), userController.resign);

// 로그인, 로그아웃
userAuthRouter.post('/user/login', userController.login);
userAuthRouter.post('/user/logout', asyncHandler(login_required), userController.logout);

// 로그인된 유저 정보 확인, 수정
userAuthRouter.get('/user/current', asyncHandler(login_required), userController.currentInfo);
userAuthRouter.put('/user/current', asyncHandler(login_required), userController.currentInfoUpdate);

// 프로필 사진 등록
userAuthRouter.put('/user/current/profile', userController.profileUpdate);

// 포인트관련 api
userAuthRouter.get('/user/current/point', asyncHandler(login_required), userController.currentPointInfo);
userAuthRouter.post('/point', userController.addPoint);

// 추가적인 작성이 필요한 함수들
userAuthRouter.get('/user/:nickname', asyncHandler(login_required), userController.InfoByNickname);
//userAuthRouter.get('/user/wishlist', asyncHandler(login_required), userController.wishlist);

export { userAuthRouter };

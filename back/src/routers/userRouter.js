import { Router } from 'express';
import { login_required } from '../middlewares/login_required.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const userController = require('../controllers/userContrloller.js');

const userAuthRouter = Router();
import { userValidation, userLoginValidation, pointValidation } from '../middlewares/validationMiddleware';

// 회원가입, 회원탈퇴
userAuthRouter.post('/user/register', userValidation, userController.register);
userAuthRouter.post('/user/resign', asyncHandler(login_required), userController.resign);

// 로그인, 로그아웃
userAuthRouter.post('/user/login', userLoginValidation, userController.login);
userAuthRouter.post('/user/logout', asyncHandler(login_required), userController.logout);

userAuthRouter.get('/user/:userId', asyncHandler(login_required), userController.userInfo);

// 로그인된 유저 정보 확인, 수정
userAuthRouter.get('/user/current', asyncHandler(login_required), userController.currentInfo);
userAuthRouter.put('/user/current', asyncHandler(login_required), userController.currentInfoUpdate);
userAuthRouter.put('/user/current/profile', asyncHandler(login_required), userController.currentInfoUpdateImage);

// 포인트관련 api
userAuthRouter.get('/user/current/point', asyncHandler(login_required), userController.currentPointInfo);
userAuthRouter.post('/point', pointValidation, userController.addPoint);

export { userAuthRouter };

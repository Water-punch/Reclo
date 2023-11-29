import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { asyncHandler } from '../middlewares/asyncHandler';

const userController = require('../controllers/userContrloller');

const userAuthRouter = Router();

userAuthRouter.post('/user/register', userController.register);
userAuthRouter.post('/user/login', userController.login);
userAuthRouter.get('/user/current', asyncHandler(login_required), userController.currentInfo);
userAuthRouter.put('/user/current', asyncHandler(login_required), userController.currentInfoUpdate);

userAuthRouter.get('/user/current/point', asyncHandler(login_required), userController.currentPointInfo);
userAuthRouter.post('/point', userController.addPoint);

// 추가적인 작성이 필요한 함수들
userAuthRouter.get('/user/:nickname', asyncHandler(login_required), userController.InfoByNickname);
//userAuthRouter.get('/user/wishlist', asyncHandler(login_required), userController.wishlist);

export { userAuthRouter };

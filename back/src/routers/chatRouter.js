import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { asyncHandler } from '../middlewares/asyncHandler';

const chatController = require('../controllers/chatController');

const chatRouter = Router();

// 자신이 들어가 있는 모든 채팅방의 마지막 메시지를 가져옴
chatRouter.get('/chat/current', asyncHandler(login_required), chatController.getRoomslast);

//itemId를 통해 아이템을 올린 유저와 채팅을 시작함
chatRouter.post('/chat/newRoom/:itemId', asyncHandler(login_required), chatController.makeRoom);
// 채팅방에 들어가 채팅을 함
chatRouter.get('/chat/room/:roomId', asyncHandler(login_required), chatController.getRoomChats);

// 채팅방을 완전히 나감
chatRouter.post('/chat/leaveRoom/:roomId', asyncHandler(login_required), chatController.leaveRoom);
// 특정 채팅방에 메시지를 입력
chatRouter.post('/chat/send/:roomId', asyncHandler(login_required), chatController.sendChat);

export { chatRouter };

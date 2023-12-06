import { Router } from 'express';
import { login_required } from '../middlewares/login_required.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const chatController = require('../controllers/chatController.js');

const chatRouter = Router();
chatRouter.use(asyncHandler(login_required));

// 자신이 들어가 있는 모든 채팅방의 마지막 메시지를 가져옴, 서버와 연결되어 있음
chatRouter.get('/chat/current', chatController.getRoomslast);

//itemId를 통해 아이템을 올린 유저와 채팅을 시작함
chatRouter.post('/chat/newRoom/:itemId', chatController.makeRoom);

// 채팅방에 들어가 채팅을 함, 서버와 연결되어 있음
chatRouter.get('/chat/room/:roomId', chatController.getRoomChats);

// 채팅창에서 과거의 채팅을 확인
chatRouter.get('/chat/old/:roomId', chatController.getRoomChatsOld);

// 채팅방을 완전히 나감
chatRouter.post('/chat/leaveRoom/:roomId', chatController.leaveRoom);
// 특정 채팅방에 메시지를 입력
chatRouter.post('/chat/send/:roomId', chatController.sendChat);

export { chatRouter };

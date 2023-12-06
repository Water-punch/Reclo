const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/login_required.js');
const { MsgService } = require('../services/MsgService.js');

const MsgService = Router();

// 쪽지 방 생성
app.post('/msg/:userId', msgController.createMsgRoom);

// 쪽지 방 확인
app.get('/msg/room/:userId', msgController.getMsgRoom);

// 쪽지 보내기
app.post('/msg/room/:roomId', msgController.sendMsg);

// 쪽지 확인
app.get('/msg/roomcheck/:userIdx', msgController.getMsg);

// 쪽지 방 삭제
app.delete('/msg/deleteroom/:userIdx', msgController.deleteMsg);

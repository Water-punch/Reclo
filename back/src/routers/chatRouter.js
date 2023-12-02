const express = require('express');
const http = require('http');

const { Router } = require('express');
const chatRouter = Router();

const { ChatService } = require('../services/chatService.js');

const app = express();
const server = http.createServer(app);

const clients = {};

app.use(express.static('public'));

// 루트 경로에 대한 SSE 엔드포인트
app.get('/chat/:roomID', async (req, res) => {
  // 해당 채팅방에 대한 데이터베이스 조회 등 로직 구현
  const roomID = req.params.roomID;

  const chats = await ChatService.getRoomChats({ roomId });

  // Content-Type을 text/event-stream으로 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  console.log(chats);
  // 클라이언트로 초기 데이터 전송
  //   if (chatRoom && chatRoom.messages.length > 0) {
  //     const lastMessage = chatRoom.messages[0];
  //     res.write(`data: ${JSON.stringify({ message: lastMessage.message })}\n\n`);
  //   }

  // 클라이언트 연결이 끊어졌을 때
  req.on('close', () => {
    // 클라이언트 연결을 닫음
    console.log('Client disconnected');
  });
});

// 메시지를 전송하는 엔드포인트
app.post('/chat/send/:roomId', express.text(), async (req, res) => {
  const roomName = req.params.room;
  const messageText = req.body;

  //   // 메시지를 데이터베이스에 저장
  //   const newMessage = new ChatMessage({ message: messageText, sender: 'user' }); // 예시로 'user'라는 고정된 사용자로 지정
  //   await newMessage.save();

  //   // 채팅방에 메시지 추가
  //   if (!chatRoom) {
  //     const newRoom = new ChatRoom({ name: roomName });
  //     await newRoom.save();
  //   }

  //   const room = await ChatRoom.findOne({ name: roomName });
  //   room.messages.push(newMessage);
  //   await room.save();

  res.sendStatus(200);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const express = require('express');
const http = require('http');

const { Router } = require('express');
const chatRouter = Router();

const { ChatService } = require('../services/chatService.js');

const app = express();
const server = http.createServer(app);

const clients = {};

app.use(express.static('public'));

// userId를 받아 참여중이던 모든 채팅방의 마지막 메시지를 받아옴
app.get('/chat/current', async (req, res) => {
   
  const userId = req.currentUserId;

  // 서버에 연결되어 있는 클라이언트로 추가함, 클라이언트의 userId를 키로 연결되어있는 res를 value로 가짐

  if (!clients[userId]) {
    clients[userId] = {};
  }
  clients[userId] = res;
  
  const lastchats = await ChatService.getRoomslast({ userId });
  
    
  // Content-Type을 text/event-stream으로 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');


  // 클라이언트로 초기 데이터 전송 
  //데이터 없는경우에는 어떻게 되지?
  res.write(`data: ${JSON.stringify({lastchats : lastchats})}\n\n`);
  
  // 클라이언트 연결이 끊어졌을 때
  req.on('close', () => {
    // 클라이언트 연결을 닫음
    delete clients.userId
  });

});

// 특정 채팅방에 메시지를 입력
app.post('/chat/send/:roomId', express.text(), async (req, res) => {
  
  const roomId = req.params.roomId
  const messageText = req.body.message;
  const userId = req.currentUserId;
    
  //roomId에 해당 하는 room이 존재하는지 확인하고 메시지를 저장
  const room = await ChatService.getRoom({roomId})
  
  //
  if (room !== null){}
  // 메시지를 데이터베이스에 저장
  const newMessage = { room : roomId, message: messageText, sender: userId } // 예시로 'user'라는 고정된 사용자로 지정
  const createdMessage = await ChatService.createChat({newMessage})
     
      
  res.sendStatus(200);
});

//itemId를 통해 채팅을 시작함
app.post('/chat/newRoom/:itemId', async (req, res) => {
  const itemId = req.params.itemId
  const messageText = req.body.message;
  const userId = req.currentUserId;
  
  // 새로운 채팅방을 생성해서 메시지를 전송함
  const createdroom = await ChatService.createRoom({userId, itemId})
  
  if (createdroom){
    const newMessage = { room : createdroom._id, message: messageText, sender: userId } // 예시로 'user'라는 고정된 사용자로 지정
    const createdMessage = await ChatService.createChat({newMessage})
  }
  
  // 룸이 제대로 생성되지 않은경우 오류처리

  res.sendStatus(200);
});

app.post('/chat/leaveRoom/:roomId', async (req, res) => {
  const roomId = req.params.roomId
  const userId = req.currentUserId;
  
  // 새로운 채팅방을 생성해서 메시지를 전송함
  const leaveRoom = await ChatService.leaveRoom({roomId, userId})
  
  if (createdroom){
    const newMessage = { room : createdroom._id, message: messageText, sender: userId } // 예시로 'user'라는 고정된 사용자로 지정
    const createdMessage = await ChatService.createChat({newMessage})
  }
  
  // 룸이 제대로 생성되지 않은경우 오류처리

  res.sendStatus(200);
});


server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

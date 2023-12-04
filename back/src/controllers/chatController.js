const { ChatService } = require('../services/chatService.js');

const clients = {};

async function getRoomslast(req, res, next) {
  try {
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
    res.write(`data: ${JSON.stringify({ lastchats: lastchats })}\n\n`);

    // 클라이언트 연결이 끊어졌을 때
    req.on('close', () => {
      // 클라이언트 연결을 닫음
      delete clients.userId;
    });
  } catch (error) {
    next(error);
  }
}

async function makeRoom(req, res, next) {
  try {
    const itemId = req.params.itemId;
    const messageText = req.body.message;
    const userId = req.currentUserId;

    // 새로운 채팅방을 생성해서 메시지를 전송함
    const createdroom = await ChatService.createRoom({ userId, itemId });

    if (createdroom) {
      const newMessage = { room: createdroom._id, message: messageText, sender: userId }; // 예시로 'user'라는 고정된 사용자로 지정
      const createdMessage = await ChatService.createChat({ newMessage });
    }

    // 룸이 제대로 생성되지 않은경우 오류처리

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function getRoomChats(req, res, next) {
  try {
    const roomId = req.params.roomId;

    const chats = await ChatService.getRoomChats({ roomId });

    // Content-Type을 text/event-stream으로 설정
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 주기적으로 채팅방의 채팅내역을 가져와 전송함
    let link = true;
    while (link) {
      setInterval(async () => {
        chats = await ChatService.getRoomChats({ roomId });
        res.write(`data: ${JSON.stringify({ chats: chats })}\n\n`);
      }, 1000);
    }

    req.on('close', () => {
      link = false;
    });
    // 클라이언트 연결이 끊어졌을 때 반복을 중단함
    //
  } catch (error) {
    next(error);
  }
}

async function leaveRoom(req, res, next) {
  try {
    const roomId = req.params.roomId;
    const userId = req.currentUserId;

    // 새로운 채팅방을 생성해서 메시지를 전송함
    const leaveRoom = await ChatService.leaveRoom({ roomId, userId });

    console.log(leaveRoom);
    // 룸이 제대로 생성되지 않은경우 오류처리

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function sendChat(req, res, next) {
  try {
    const roomId = req.params.roomId;
    const messageText = req.body.message;
    const userId = req.currentUserId;

    //roomId에 해당 하는 room이 존재하는지 확인하고 메시지를 저장
    const room = await ChatService.getRoom({ roomId });

    //
    //if (room !== null){}

    // 메시지를 데이터베이스에 저장
    const newMessage = { room: roomId, message: messageText, sender: userId }; // 예시로 'user'라는 고정된 사용자로 지정
    const createdMessage = await ChatService.createChat({ newMessage });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

module.exports = { getRoomslast, getRoomChats, sendChat, makeRoom, leaveRoom };

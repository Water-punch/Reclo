const { ChatService } = require('../services/chatService.js');
const pageSize = 10;

async function getRoomslast(req, res, next) {
  try {
    const userId = req.currentUserId;

    // 서버에 연결되어 있는 클라이언트로 추가함, 클라이언트의 userId를 키로 연결되어있는 res를 value로 가짐
    let lastchats = await ChatService.getRoomslast({ userId });

    // Content-Type을 text/event-stream으로 설정
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 클라이언트에게 지속적으로 데이터를 보내줌, 현재는 2초주기
    const chatsinterval = setInterval(async () => {
      lastchats = await ChatService.getRoomslast({ userId });
      res.write('event: roomslast\n');
      res.write(`data: ${JSON.stringify({ lastchats: lastchats })}\n\n`);
    }, 2000);

    // 클라이언트 연결이 끊어졌을 때
    req.on('close', () => {
      // 클라이언트 연결을 닫음
      clearInterval(chatsinterval);
    });
  } catch (error) {
    next(error);
  }
}

async function makeRoom(req, res, next) {
  try {
    const itemId = req.params.itemId;
    const message = req.body.message ?? '';
    const userId = req.currentUserId;

    // 새로운 채팅방을 생성해서 메시지를 전송함
    const createdroom = await ChatService.createRoom({ userId, itemId });

    if (createdroom) {
      const newMessage = { room: createdroom._id, message, sender: userId }; // 예시로 'user'라는 고정된 사용자로 지정
      const createdMessage = await ChatService.createChat({ newMessage });
    }

    res.status(201).json({ roomId: createdroom._id });
  } catch (error) {
    next(error);
  }
}

async function getRoomChats(req, res, next) {
  try {
    const roomId = req.params.roomId;
    let chats = await ChatService.getRoomChatsNew({ roomId, pageSize });

    // Content-Type을 text/event-stream으로 설정
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write(`data: ${JSON.stringify({ chats })}\n\n`);
    // 주기적으로 채팅방의 채팅내역을 가져와 전송함

    const chatsinterval = setInterval(async () => {
      chats = await ChatService.getRoomChatsNew({ roomId, pageSize });
      res.write('event: chats\n');
      res.write(`data: ${JSON.stringify({ chats: chats })}\n\n`);
    }, 2000);

    // 채팅방을 닫음
    req.on('close', () => {
      clearInterval(chatsinterval);
    });
    // 클라이언트 연결이 끊어졌을 때 반복을 중단함
    //
  } catch (error) {
    next(error);
  }
}

async function getRoomChatsOld(req, res, next) {
  try {
    // 마지막 채팅부분 클라이언트에서 가져옴 -> 추가적인 채팅부분 서버에서 가져옴 -> 추가할 부분 전달
    const roomId = req.params.roomId;
    const cursor = req.query.cursor ? req.query.cursor : Date.now();

    const oldChats = await ChatService.getRoomChatsOld({ roomId, cursor, pageSize });

    const resdata = {
      oldchats: oldChats,
      cursor: oldChats[oldChats.length - 1] ? oldChats[oldChats.length - 1].createdAt : cursor,
    };

    res.status(201).json(resdata);
  } catch (error) {
    next(error);
  }
}

//채팅방에서 영구적으로 나감
async function leaveRoom(req, res, next) {
  try {
    const roomId = req.params.roomId;
    const userId = req.currentUserId;

    // 새로운 채팅방을 생성해서 메시지를 전송함
    const leaveRoom = await ChatService.leaveRoom({ roomId, userId });
    // 룸이 제대로 생성되지 않은경우 오류처리

    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

//
async function sendChat(req, res, next) {
  try {
    const roomId = req.params.roomId;
    const messageText = req.body.message ?? '';
    const userId = req.currentUserId;
    const imageUrl = req.body.imageUrl;

    //const chatImage = req.body.url ?? null;
    // 메시지를 데이터베이스에 저장
    const newMessage = { room: roomId, message: messageText, sender: userId, imageUrl: imageUrl }; // 예시로 'user'라는 고정된 사용자로 지정
    const createdMessage = await ChatService.createChat({ newMessage });

    if (imageUrl) {
      const itemsImage = imageService.uploadImages({ ImgUrl: imageUrl });
    }

    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { getRoomslast, getRoomChats, sendChat, makeRoom, leaveRoom, getRoomChatsOld };

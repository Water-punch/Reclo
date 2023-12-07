import { ForbiddenError } from '../utils/customError.js';
const { ChatService } = require('../services/chatService.js');
const ObjectId = require('mongoose').Types.ObjectId;

// user가 해당 채팅방에 접근할 권한이 있는지 확인하는 미들웨어
async function isInRoom(req, res, next) {
  const roomId = req.params.roomId;
  const userId = new ObjectId(req.currentUserId);

  const room = await ChatService.getRoom({ roomId });
  console.log(userId == room.user);
  console.log(new ObjectId(userId));
  next();

  //userid가 room의 user나 host에 있고 채팅방에서 나가지 않은 상태일때만 다음 작업으로 처리함
  // if (
  //   (userId == room.user && room.userDeleted == false) ||
  //   (userId == room.hostuser && room.hostuserDeleted == false)
  // ) {
  //   next();
  // }
  // throw new ForbiddenError('해당 채팅방에 접근할 권한이 없습니다.');
}

export { isInRoom };

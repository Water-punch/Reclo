import { Chat } from '../db';
import { Item } from '../db';
import {
  BadRequestError,
  INVALID_USER_Error,
  INVALID_ITEM_Error,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  INVALID_ROOM_Error,
  InternalServerError,
} from '../utils/customError';

class ChatService {
  //특정 채팅방의 대화를 가져옴
  static async createRoom({ userId, itemId }) {
    const item = await Item.findByItemId({ itemId });

    if (!item) {
      throw new INVALID_ITEM_Error('해당 상품이 더이상 존재하지 않습니다.');
    }

    const newRoom = { itemId: itemId, hostuser: item.userId, user: userId };

    const room = await Chat.createRoom({ newRoom });

    if (!room) {
      throw new InternalServerError('채팅방 생성에 실패하였습니다.');
    }

    return room;
  }
  static async getRoom({ roomId }) {
    const room = await Chat.findRoom({ roomId });

    if (!room) {
      throw new INVALID_ROOM_Error('채팅방이 존재하지 않습니다.');
    }
    return room;
  }

  static async leaveRoom({ roomId, userId }) {
    const leavedRoom = await Chat.leaveRoom({ roomId, userId });

    if (!leavedRoom) {
      throw new INVALID_ROOM_Error('채팅방이 존재하지 않습니다.');
    }
    return leavedRoom;
  }

  static async createChat({ newMessage }) {
    const createdMessage = await Chat.saveChat({ chat: newMessage });

    if (!createdMessage) {
      throw new INVALID_ROOM_Error('채팅 생성에 실패하였습니다.');
    }

    return createdMessage;
  }
  static async getRoomChats({ roomId }) {
    const chats = await Chat.findChatAll({ roomId });
    return chats;
  }

  static async getRoomslast({ userId }) {
    const rooms = await Chat.findRooms({ userId });

    const lastchats = await Promise.all(
      rooms.map(async (room) => {
        const lastchat = await Chat.findChatLast({ roomId: room._id });
        return lastchat;
      })
    );

    return lastchats.sort((a, b) => b.createdAt - a.createdAt);
  }
}

export { ChatService };

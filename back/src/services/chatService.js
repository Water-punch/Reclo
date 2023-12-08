import { Chat } from '../db';
import { User } from '../db';
import { Item } from '../db';
import { INVALID_ITEM_Error, INVALID_ROOM_Error, InternalServerError, ConflictError } from '../utils/customError.js';

class ChatService {
  //특정 채팅방의 대화를 가져옴
  static async createRoom({ userId, itemId }) {
    const item = await Item.findByItemId({ itemId });

    if (!item) {
      throw new INVALID_ITEM_Error('해당 상품이 더이상 존재하지 않습니다.');
    }

    const roomexist = await Chat.findRoombyUserIdAnditemId({ userId, itemId });

    if (roomexist) {
      throw new ConflictError('이미 채팅방이 존재합니다.');
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

    const user = await User.findById({ userId });

    // 상대방이 나갔다는 메시지 추가
    const newMessage = {
      room: roomId,
      message: `${user.nickname}님이 채팅방을 나갔습니다.`,
      sender: userId,
      isSystem: true,
    };

    const createdMessage = await Chat.saveChat({ chat: newMessage });

    return leavedRoom;
  }

  static async createChat({ newMessage }) {
    const createdMessage = await Chat.saveChat({ chat: newMessage });

    if (!createdMessage) {
      throw new INVALID_ROOM_Error('채팅 생성에 실패하였습니다.');
    }

    return createdMessage;
  }

  static async getRoomChatsNew({ roomId, pageSize }) {
    const chats = await Chat.findChatNews({ roomId, pageSize });
    return chats;
  }

  static async getRoomChatsOld({ roomId, cursor, pageSize }) {
    const chats = await Chat.findChatOlds({ roomId, cursor: { $lt: cursor }, pageSize });
    return chats;
  }

  static async getRoomslast({ userId }) {
    const rooms = await Chat.findRooms({ userId });

    const lastchats = await Promise.all(
      rooms.map(async (room) => {
        const lastchat = Chat.findChatLast({ roomId: room._id });
        return lastchat;
      })
    );

    return lastchats.sort((a, b) => b.createdAt - a.createdAt);
  }
}

export { ChatService };

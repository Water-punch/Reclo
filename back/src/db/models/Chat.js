import { RoomModel, ChatModel } from '../schemas/chat.js';

class Chat {
  static async createRoom({ newRoom }) {
    const createdRoom = await RoomModel.create(newRoom);
    return createdRoom;
  }

  static async findRoom({ roomId }) {
    const room = await RoomModel.findById(roomId);
    return room;
  }

  static async saveChat({ chat }) {
    const createdChat = await ChatModel.create(chat);
    return createdChat;
  }

  static async findRooms({ userId }) {
    // 자신이 유지중인 채팅방들을 가져옴
    const Rooms1 = await RoomModel.find({ $and: [{ user: userId }, { userDeleted: false }] });
    const Rooms2 = await RoomModel.find({ $and: [{ hostuser: userId }, { hostuserDeleted: false }] });

    //rooms확인
    const Rooms = [...Rooms1, ...Rooms2];
    return Rooms;
  }

  static async leaveRoom({ roomId, userId }) {
    const room = await RoomModel.findById({ roomId });

    if (room.user === userId) {
      const leaveRoom = await RoomModel.findByIdAndUpdate(
        { roomId },
        { $set: { userDeleted: true } },
        { returnOriginal: false }
      );
      return leaveRoom;
    } else if (room.hostuser === userId) {
      const leaveRoom = await RoomModel.findByIdAndUpdate(
        { roomId },
        { $set: { hostuserDeleted: true } },
        { returnOriginal: false }
      );

      return leaveRoom;
    }
  }

  static async findChatAll({ roomId }) {
    const chats = await ChatModel.find({ room: roomId });
    return chats;
  }

  static async findChatNews({ roomId }) {
    const chats = await ChatModel.find({ room: roomId }).sort({ createdAt: -1 }).limit(10);
    return chats;
  }

  static async findChatOlds({ roomId, cursor, pageSize }) {
    // 커서식으로 불러오기

    const chats = await ChatModel.find({
      $and: [{ room: roomId }, { createdAt: cursor }],
    })
      .sort({ createdAt: -1 })
      .limit(pageSize);

    // 더이상 불러올 chat이 없는경우?
    return chats;
  }

  static async findChatLast({ roomId }) {
    //안되면 findone -> find + limit
    const chat = await ChatModel.find({ room: roomId }).sort({ createdAt: -1 }).limit(1);
    return chat;
  }
}

export { Chat };

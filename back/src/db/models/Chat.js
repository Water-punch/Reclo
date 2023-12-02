import { RoomModel, ChatModel } from '../schemas/chat';

class Chat {
  static async createRoom({ newRoom }) {
    const createdRoom = await RoomModel.create({ newRoom });
    return createdRoom;
  }

  static async saveChat({ chat }) {
    const createdChat = await ChatModel.create({ chat });
    return createdChat;
  }

  static async findRooms({ userId }) {
    const Rooms1 = await RoomModel.find({ user: userId });
    const Rooms2 = await RoomModel.find({ hostuser: userId });

    const Rooms = Rooms1 + Rooms2;

    return Rooms;
  }

  static async findChatAll({ roomId }) {
    const chats = await ChatModel.findOne({ _id: roomId }).sort({ createdAt: 'asc' });
    return chats;
  }
}

export { Chat };

import { Chat } from '../db';

class ChatService {
  static async getRoomChats({ roomId }) {
    const chats = await Chat.findChatAll({ roomId });
    return chats;
  }
}

export { ChatService };

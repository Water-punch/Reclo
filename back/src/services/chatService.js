import { Chat } from '../db';
import { Item } from '../db';
class ChatService {
  //특정 채팅방의 대화를 가져옴
  static async getRoomChats({ roomId }) {
    const chats = await Chat.findChatAll({ roomId });
    return chats;
  }

  static async getRoomslast({ userId }) {
    const rooms = await Chat.findRooms({ userId });
    
    const lastchats = await Promise.all(rooms.map(async (room) => {
      const lastchat = await Chat.findChatLast({ roomId: room._id });
      return lastchat;
    }));

    return lastchats.sort((a, b) => b.createdAt - a.createdAt);

  }
  static async createRoom({userId,itemId}){
    const host = await Item.findByItemId({itemId}).userId

    const newRoom = {itemId : itemId, hostuser : host ,user: userId}

    const room = await Chat.createRoom({newRoom})
    return room

  }
  static async createChat({newMessage}){
    const createdMessage = await Chat.saveChat({chat : newMessage})
    return createdMessage; 
  }
  static async leaveRoom({roomId, userId}){
    const leavedRoom = await Chat.leaveRoom({roomId, userId})
    return leavedRoom
  }
}

export { ChatService };

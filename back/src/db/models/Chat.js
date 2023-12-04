import { RoomModel, ChatModel } from '../schemas/chat';

class Chat {
  static async createRoom({ newRoom }) {
    const createdRoom = await RoomModel.create({ newRoom });
    return createdRoom;
  }

  static async findRoom({ roomId }) {
    const room = await RoomModel.findById({ roomId });
    return room;
  }

  static async saveChat({ chat }) {
    const createdChat = await ChatModel.create({ chat });
    return createdChat;
  }

  static async findRooms({ userId }) {
    // 자신이 유지중인 채팅방들을 가져옴
    const Rooms1 = await RoomModel.find({ $and :[{user: userId}, {userDeleted : false} ]});
    const Rooms2 = await RoomModel.find({ $and : [{hostuser: userId}, {hostuserDeleted : false} ]});

    //rooms확인
    console.log("rooms :", Rooms1, Rooms2)
    const Rooms = Rooms1 + Rooms2;

    return Rooms;
  }

  static async leaveRoom({roomId, userId}){
    const room = await RoomModel.findById({roomId})
    
    if (room.user === userId){
      const leaveRoom = await RoomModel.findByIdAndUpdate({roomId}, {$set :{userDeleted : true}}, {returnOriginal : false})
      
    }

    else if (room.hostuser === userId){
      const leaveRoom = await RoomModel.findByIdAndUpdate({roomId}, {$set:{hostuserDeleted : true}}, {returnOriginal : false})
    }

    else {
      throw Error("")
    }
    return leaveRoom;

  }

  static async findChatAll({ roomId }) {
    const chats = await ChatModel.find({ _id: roomId }).sort({ createdAt: 'asc' });
    return chats;

  }

  static async findChatLast({ roomId }) {
    //안되면 findone -> find + limit
    const chat = await ChatModel.findOne({ _id: roomId }).sort({ createdAt : -1 });
    return chat;
  }
  

}

export { Chat };

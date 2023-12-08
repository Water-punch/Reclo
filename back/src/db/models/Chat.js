import { RoomModel, ChatModel } from '../schemas/chat.js';
const ObjectId = require('mongoose').Types.ObjectId;

class Chat {
  static async createRoom({ newRoom }) {
    const createdRoom = await RoomModel.create(newRoom);
    return createdRoom;
  }

  static async findRoom({ roomId }) {
    const room = await RoomModel.findById(roomId).select('+user +userDeleted +hostuser +hostuserDeleted');

    return room;
  }

  static async findRoombyUserIdAnditemId({ userId, itemId }) {
    const room = await RoomModel.findOne({ $and: [{ user: userId }, { itemId: itemId }, { userDeleted: false }] });
    return room;
  }

  static async saveChat({ chat }) {
    const createdChat = await ChatModel.create(chat);

    delete createdChat._doc._id;

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
    const room = await RoomModel.findById(roomId).selete('+user', '+hostuser');

    if (room.user == userId) {
      const leaveRoom = await RoomModel.findByIdAndUpdate(
        { _id: roomId },
        { $set: { userDeleted: true } },
        { returnOriginal: false }
      );
      return leaveRoom;
    } else if (room.hostuser == userId) {
      const leaveRoom = await RoomModel.findByIdAndUpdate(
        { _id: roomId },
        { $set: { hostuserDeleted: true } },
        { returnOriginal: false }
      );

      return leaveRoom;
    }
  }

  static async findChatAll({ roomId }) {
    const chats = await ChatModel.aggregate([
      {
        $match: {
          room: new ObjectId(roomId),
        },
      },

      {
        $lookup: {
          from: 'users', // 'User' 컬렉션
          localField: 'sender',
          foreignField: '_id', // '_id' 필드와 조인
          as: 'senderData', // 조인된 결과를 저장할 필드 이름
        },
      },
      {
        $unwind: '$senderData',
      },
      {
        $project: {
          _id: 0,
          room: 1,
          message: 1,
          createdAt: 1,
          sender: '$senderData.nickname',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]).exec();

    return chats;
  }

  static async findChatNews({ roomId, pageSize }) {
    const chats = await ChatModel.aggregate([
      {
        $match: {
          room: new ObjectId(roomId),
        },
      },

      {
        $lookup: {
          from: 'users', // 'User' 컬렉션
          localField: 'sender',
          foreignField: '_id', // '_id' 필드와 조인
          as: 'senderData', // 조인된 결과를 저장할 필드 이름
        },
      },
      {
        $unwind: '$senderData',
      },
      {
        $project: {
          _id: 0,
          room: 1,
          message: 1,
          createdAt: 1,
          sender: '$senderData.nickname',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: pageSize,
      },
    ]).exec();
    return chats;
  }

  static async findChatOlds({ roomId, cursor, pageSize }) {
    // 커서식으로 불러오기

    const chats = await ChatModel.aggregate([
      {
        $match: {
          $and: [{ room: new ObjectId(roomId) }, { createdAt: cursor }],
        },
      },

      {
        $lookup: {
          from: 'users', // 'User' 컬렉션
          localField: 'sender',
          foreignField: '_id', // '_id' 필드와 조인
          as: 'senderData', // 조인된 결과를 저장할 필드 이름
        },
      },
      {
        $unwind: '$senderData',
      },
      {
        $project: {
          _id: 0,
          room: 1,
          message: 1,
          createdAt: 1,
          sender: '$senderData.nickname',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: pageSize,
      },
    ]).exec();

    // 더이상 불러올 chat이 없는경우?
    return chats;
  }

  static async findChatLast({ roomId }) {
    //안되면 findone -> find + limit
    const chat = await ChatModel.find({ room: roomId }).select('-_id').sort({ createdAt: -1 }).limit(1);

    return chat;
  }
}

export { Chat };

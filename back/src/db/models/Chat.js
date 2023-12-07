import { RoomModel, ChatModel } from '../schemas/chat.js';
const ObjectId = require('mongoose').Types.ObjectId;
import { BadRequestError } from '../../utils/customError.js';
class Chat {
  static async createRoom({ newRoom }) {
    const createdRoom = await RoomModel.create(newRoom);
    return createdRoom;
  }

  static async findRoom({ roomId }) {
    const room = await RoomModel.findById(roomId);
    return room;
  }

  static async findRoombyUserIdAnditemId({ userId, itemId }) {
    const room = await RoomModel.find({ $and: [{ user: userId }, { itemId: itemId }, { userDeleted: false }] });
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
    console.log(roomId, userId);

    const room = await RoomModel.findById(roomId);
    console.log(room);

    if (room.user == userId) {
      //이미 나간 채팅방인지 확인
      if (room.userDeleted == true) {
        throw new BadRequestError('존재하지 않는 채팅방입니다.');
      }

      const leaveRoom = await RoomModel.findByIdAndUpdate(
        { _id: roomId },
        { $set: { userDeleted: true } },
        { returnOriginal: false }
      );
      return leaveRoom;
    } else if (room.hostuser == userId) {
      if (room.hostuserDeleted == true) {
        throw new BadRequestError('존재하지 않는 채팅방입니다.');
      }
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
    const chat = await ChatModel.find({ room: roomId }).sort({ createdAt: -1 }).limit(1);
    return chat;
  }
}

export { Chat };

import { Schema, model } from 'mongoose';

const chatRoomSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Item',
    select: false,
  },
  hostuser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    select: false,
  },
  hostuserDeleted: { type: Boolean, default: false, select: false },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    select: false,
  },
  userDeleted: { type: Boolean, default: false, select: false },
});

chatRoomSchema.index({
  itemId: 1,
  user: 1,
});

const RoomModel = model('Room', chatRoomSchema);

const chatMessageSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, required: true, ref: 'Room' },
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isSystem: {
      type: Boolean,
      defalut: false,
    },
    chatImgUrl: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

chatRoomSchema.index({
  room: 1,
  createdAt: -1,
});

const ChatModel = model('Chat', chatMessageSchema);

export { RoomModel, ChatModel };

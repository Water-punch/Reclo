import { Schema, model } from 'mongoose';

const chatRoomSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Item',
  },
  hostuser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  hostuserDeleted: { type: Boolean, default: false },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userDeleted: { type: Boolean, default: false },
});

chatRoomSchema.index(
  {
    itemId: 1,
    user: 1,
  },
  { unique: true }
);

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
  },
  {
    timestamps: true,
  }
);

const ChatModel = model('Chat', chatMessageSchema);

export { RoomModel, ChatModel };

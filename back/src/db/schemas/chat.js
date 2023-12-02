import { Schema, model } from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const RoomModel = model('Room', chatRoomSchema);

const chatMessageSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const ChatModel = model('Chat', chatMessageSchema);

export { RoomModel, ChatModel };

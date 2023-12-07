import { Schema, model } from 'mongoose';

const UserImageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserImageModel = model('UserImage', UserImageSchema);

const ItemImageSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ItemImageModel = model('ItemImage', ItemImageSchema);

const ChatImageSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ChatImageModel = model('ChatImage', ItemImageSchema);

export { UserImageModel, ItemImageModel };

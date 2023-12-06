import { Schema, model } from 'mongoose';

const wishItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      uniqe: true,
      ref: 'Item',
    },

    imageUrl: {
      type: Array,
      require: false,
      ref: 'Item',
    },

    likeStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    strictPopulate: false,
  }
);

const wishItemModel = model('wishItem', wishItemSchema);
export { wishItemModel };

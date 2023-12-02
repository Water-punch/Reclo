import { Schema, model } from 'mongoose';

const ItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    like: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    state: {
      type: String,
      required: true,
      default: '거래 가능',
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    itemsImgUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ItemModel = model('Item', ItemSchema);

export { ItemModel };

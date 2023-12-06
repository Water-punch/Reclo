import { Schema, model } from 'mongoose';

const ImageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    itemId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Item',
    },

    imageUrl: {
      type: Array,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    path: {
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

const ImageModel = model('Image', ImageSchema);
export { ImageModel };

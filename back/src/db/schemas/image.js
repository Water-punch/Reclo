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
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const ImageModel = model('Image', ImageSchema);
export { ImageModel };

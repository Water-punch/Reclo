import { Schema, model } from 'mongoose';

const ImageSchema = new Schema(
  {
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

const ImageModel = model('Image', ImageSchema);

export { ImageModel };

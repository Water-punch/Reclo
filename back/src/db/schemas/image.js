import { Schema, model } from 'mongoose';

const ImageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    object: {
      type: String,
      required: false,
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

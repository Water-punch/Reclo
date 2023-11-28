import { Schema, model } from 'mongoose';

const PointSchema = new Schema(
  {
    ids: {
      type: {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        itemId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Item',
        },
      },
      required: true,
      unique: true,
    },

    point: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PointModel = model('Point', PointSchema);

export { PointModel };

import { Schema, model } from 'mongoose';

const PointSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      select: false,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
      select: false,
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

PointSchema.index(
  {
    userId: 1,
    itemId: 1,
  },
  { unique: true }
);

const PointModel = model('Point', PointSchema);

export { PointModel };

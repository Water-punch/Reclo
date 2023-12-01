import { Schema, model } from 'mongoose';

const wishItemSchema = new Schema({
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
});

const wishItemModel = model('wishItem', wishItemSchema);
export { wishItemModel };

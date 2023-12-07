import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    rank: {
      type: String,
      default: 0,
    },
    birth: {
      type: Date,
      //required: true,
    },
    point: {
      type: Number,
      default: 0,
    },

    userImgUrl: {
      type: Array,
      required: false,
    },
    admin: {
      type: Boolean,
      default: false,
      select: false,
    },
    deleted: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };

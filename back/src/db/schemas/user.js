import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      default: 0,
    },
    birth: {
      type: Date,
      required: true,
    },
    point: {
      type: Number,
      default: 0,
    },

    userImgUrl: {
      type: String,
      required: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
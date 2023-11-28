import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
});

const RefreshTokenModel = model("RefreshToken", refreshTokenSchema);

export { RefreshTokenModel };

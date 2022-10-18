import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

export const userAuthModal = mongoose.model("User", userAuthSchema);

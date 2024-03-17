import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
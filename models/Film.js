import mongoose from "mongoose";
const Film = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // release date
    date: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    category: {
      type: [String],
      required: true
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: Boolean,
    },
    director: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Film", Film);
import mongoose from "mongoose";

const myImageSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  url: {
    type: String,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  albums: {
    type: [String],
    default: [],
  },
});

export const MyImage = mongoose.model("MyImage", myImageSchema);

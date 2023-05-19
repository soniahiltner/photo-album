import mongoose from "mongoose";

const photoAlbumSchema = {
  name: {
    type: String,
    required: [true, "Album must have a name"],
    unique: [true, "Album name should be unique"],
    lowercase: true,
    trim: true,
    minLength: 1,
  },
};

export const PhotoAlbum = mongoose.model("PhotoAlbum", photoAlbumSchema);

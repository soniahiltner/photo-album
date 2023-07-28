import express from "express";
import ViteExpress from "vite-express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import multer from "multer";
import mongoose from "mongoose";
import { MyImage } from "./model/myImageSchema.js";
import { PhotoAlbum } from "./model/photoAlbumSchema.js";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.VITE_CLOUD_NAME,
  api_key: process.env.VITE_API_KEY,
  api_secret: process.env.VITE_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "myImages",
    allowedFormats: ["jpg", "jpeg", "png", "gif", "svg", "webp", "tiff"],
    maxImageFileSize: 2000000,
  },
});

//Multer
const upload = multer({ storage: storage });

//MongoDB
// eslint-disable-next-line no-undef
const uri = process.env.VITE_MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

//express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get all images
app.get("/api/images", async (req, res) => {
  const allImages = await MyImage.find();

  res.json(allImages);
});
 
//Get all albums
app.get("/api/albums", async (req, res) => {
  const allAlbums = await PhotoAlbum.find();
  res.json(allAlbums);
});

//Create album
app.post("/api/createalbum", async (req, res) => {
  
  if (req.body.length === 0) {
    res.statusCode(400).send("name should not be empty");
  }
  const album = await PhotoAlbum.create(req.body);
  res.json(album);
});

//Delete album
app.delete("/api/deletealbum/:name", async (req, res) => {
  const name = req.params.name;
  //delete album
  const album = await PhotoAlbum.deleteOne({ name: name });
  console.log(album.deletedCount);

  //update images
  await MyImage.updateMany({}, { $pull: { albums: { $in: [`${name}`] } } });
  res.status(200);
});

//Upload images
const maxFiles = 3;
const uploadFiles = upload.array("file", maxFiles);
app.post("/api/uploadimages", async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.statusCode(400).send(err.message);
    } else if (err) {
      res.statusCode(400).send(err.message);
    } else {
      const files = req.files;

      files.forEach(async (file) => {
        await MyImage.create({
          filename: file.filename,
          url: file.path,
        });
      });
      
      const images = await MyImage.find();
      res.status(200).json(images);
    }
  });
});

//Delete one image from database
app.delete("/api/deleteimage/:id", async (req, res) => {
  const id = req.params.id;
  const image = await MyImage.findById(id)
  const imagePublicId = image.filename
  await MyImage.deleteOne({ _id: id });
  await cloudinary.uploader.destroy(imagePublicId)
  res.status(200).send();
});

//Update image-favourite
app.put("/api/updatefavourite/:id", async (req, res) => {
  
  const id = req.params.id;
  const { favourite } = req.body;
  
  const image = await MyImage.findOneAndUpdate(
    { _id: id },
    { favourite: favourite }
  );
  
  res.json(image);
});

//update image-albums
//Add images to an album
app.put("/api/addtoalbum/:id", async (req, res) => {
  const id = req.params.id;

  const image = await MyImage.findOneAndUpdate(
    { _id: id },
    { $addToSet: { albums: req.body.albums } },
    { new: true }
  );
  
  res.json(image);
});

// Remove image from album
app.put("/api/removefromalbum", async (req, res) => {
  const albumName = req.query.albumName;
  const imageId = req.query.imageId;
  
  await MyImage.findOneAndUpdate({ _id: imageId }, { $pull: { albums: { $in: [`${albumName}`] } } })
  const image = await MyImage.findById({ _id: imageId })
 
  res.json(image);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

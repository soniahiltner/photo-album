import express from 'express'
import ViteExpress from 'vite-express'
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import multer from 'multer'
import mongoose from 'mongoose'

// Routes
import imagesRouter from './routes/images.js'
import albumsRouter from './routes/albums.js'

import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.VITE_CLOUD_NAME,
  api_key: process.env.VITE_API_KEY,
  api_secret: process.env.VITE_API_SECRET,
  secure: true
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'myImages',
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'tiff'],
    maxImageFileSize: 2000000
  }
})

//Multer
const upload = multer({ storage: storage })

//MongoDB
// eslint-disable-next-line no-undef
const uri = process.env.VITE_MONGO_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

//express
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/images', imagesRouter)
app.use('/api/albums', albumsRouter)

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
)

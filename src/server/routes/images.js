import express from 'express'
const router = express.Router()
import { MyImage } from '../model/myImageSchema.js'
import multer from 'multer'
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

//Get all images
router.get('/', async (req, res) => {
  const page = +req.query.page || 1
  const limit = 10
  const skip = (page - 1) * limit
  try {
    const count = await MyImage.countDocuments()
    const totalPages = Math.ceil(count / limit)
    const images = await MyImage.find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      images: images,
      page: page,
      count: count,
      totalPages: totalPages
    })
  } catch (error) {
    console.log(error)
  }
})

//Get favourites
router.get('/favourites', async (req, res) => {
  const page = +req.query.page || 1
  const limit = 10
  const skip = (page - 1) * limit
  try {
    const count = await MyImage.find({ favourite: true }).countDocuments()
    const totalPages = Math.ceil(count / limit)
    const favourites = await MyImage.find({ favourite: true })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec()

    res.json({
      favourites: favourites,
      page: page,
      count: count,
      totalPages: totalPages
    })
  } catch (error) {
    console.log(error)
  }
})

// Get album images
router.get('/album/:name', async (req, res) => {
  const albumName = req.params.name

  try {
    const images = await MyImage.find({ albums: { $in: [albumName] } })
      .sort({ _id: -1 })
      .exec()
    
    res.json(images)
  } catch (error) {
    console.log(error)
  }
})

// Get album last-image
router.get('/lastimage/:name', async (req, res) => {
  const albumName = req.params.name

  try {
    const image = await MyImage.findOne({ albums: { $in: [albumName] } })
      .sort({ _id: -1 })
      .limit(1)
      .exec()
    
    res.json(image)
  } catch (error) {
    console.log(error)
  }
})

//Upload images
const maxFiles = 3
const uploadFiles = upload.array('file', maxFiles)
router.post('/', async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log('MulterError', err)
    } else if (err) {
      console.log('An unknown error occurred when uploading', err)
    } else {
      
      const files = req.files

      files.forEach(async (file) => {
        await MyImage.create({
          filename: file.filename,
          url: file.path
        })
      })

      const images = await MyImage.find()
      res.status(200).json(images)
    }
  })
})

//Delete one image from database
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const image = await MyImage.findById(id)
  const imagePublicId = image.filename
  await MyImage.deleteOne({ _id: id })
  await cloudinary.uploader.destroy(imagePublicId)
  res.status(200).send()
})

// Update image-favourite
router.put('/updatefavourite/:id', async (req, res) => {
  const id = req.params.id
  const { favourite } = req.body

  await MyImage.findOneAndUpdate(
    { _id: id },
    { favourite: favourite },
    { new: true }
  )
  const images = await MyImage.find()
  const favCount = await MyImage.find({ favourite: true }).countDocuments()

  res.status(200).json({images, favCount})
  
})

// Update image-albums
// Add image to an album
router.put('/addtoalbum/:id', async (req, res) => {
  const id = req.params.id

  const image = await MyImage.findOneAndUpdate(
    { _id: id },
    { $addToSet: { albums: req.body.albums } },
    { new: true }
  )
   
  res.json(image)
})

// Remove image from album
router.put('/removefromalbum', async (req, res) => {
  const albumName = req.query.albumName
  const imageId = req.query.imageId

  await MyImage.findOneAndUpdate(
    { _id: imageId },
    { $pull: { albums: { $in: [`${albumName}`] } } }
  )
  const image = await MyImage.findById({ _id: imageId })

  res.json(image)
})

export default router

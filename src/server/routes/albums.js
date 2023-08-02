import express from 'express'
const router = express.Router()
import { MyImage } from '../model/myImageSchema.js'
import { PhotoAlbum } from '../model/photoAlbumSchema.js'

//Get all albums
router.get('/', async (req, res) => {
  const allAlbums = await PhotoAlbum.find()
  res.json(allAlbums)
})

//Create album
router.post('/', async (req, res) => {
  if (req.body.length === 0) {
    res.statusCode(400).send('name should not be empty')
  }
  const album = await PhotoAlbum.create(req.body)
  res.json(album)
})

//Delete album
router.delete('/:name', async (req, res) => {
  const name = req.params.name
  //delete album
  const album = await PhotoAlbum.deleteOne({ name: name })
  console.log(album.deletedCount)

  //update images
  await MyImage.updateMany({}, { $pull: { albums: { $in: [`${name}`] } } })
  res.status(200)
})
export default router

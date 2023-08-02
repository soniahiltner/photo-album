import { useParams } from 'react-router-dom'
import styles from './Album.module.css'
import { useContext, useEffect, useState } from 'react'
import { ImagesContext } from '../../context/ImagesContext'
import Gallery from '../../components/Gallery/Gallery'

const Album = () => {
  const [imagesInAlbum, setImagesInAlbum] = useState([])
  const { albums, albumImagesEndpoint } = useContext(ImagesContext)
  const { id } = useParams()

  const album = albums.find((item) => item._id === id)

  // Get all images for each album
  const getImagesAlbum = () => {
    fetch(`${albumImagesEndpoint}${album?.name}`)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
        res.json().then((data) => {
          setImagesInAlbum(data)
        })
      })
      .catch((err) => console.log('Error fetching images', err))
  }
  useEffect(() => {
    getImagesAlbum()
  }, [album, imagesInAlbum])

  return (
    <div className={styles.album}>
      <h1>{album?.name} </h1>
      <Gallery
        pictures={imagesInAlbum}
        album={album}
      />
    </div>
  )
}

export default Album

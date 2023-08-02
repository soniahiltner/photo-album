import { useContext, useEffect, useState } from 'react'
import styles from './AlbumListItem.module.css'
import { ImagesContext } from '../../context/ImagesContext'
import DeleteAlbum from '../DeleteAlbum/DeleteAlbum'
import { Link } from 'react-router-dom'

const AlbumListItem = ({ album }) => {
  const [image, setImage] = useState(null)
  const { albumImageEndpoint } = useContext(ImagesContext)

  // Get last image for each album
  const getImageAlbum = () => {
    fetch(`${albumImageEndpoint}${album.name}`)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
        res.json().then((data) => {
          setImage(data)
        })
      })
      .catch((err) => console.log('Error fetching albums', err))
  }
  useEffect(() => {
    getImageAlbum()
  }, [])

  return (
    <div className={styles.albumContainer}>
      <div className={styles.header}>
        <h2>{album.name}</h2>
        <DeleteAlbum album={album} />
      </div>

      {!image && (
        <div className={styles.emptyAlbum}>
          <span>Empty album</span>
        </div>
      )}
      {image && (
        <Link to={`/albums/${album._id}`}>
          <div className={styles.albumImageLink}>
            <img src={image.url} />
          </div>
        </Link>
      )}
    </div>
  )
}

export default AlbumListItem

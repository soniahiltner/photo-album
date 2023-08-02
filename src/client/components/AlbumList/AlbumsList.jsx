
import { useContext } from 'react'
import { ImagesContext } from '../../context/ImagesContext'
import AlbumListItem from '../AlbumListItem/AlbumListItem'
import styles from './AlbumsList.module.css'

const AlbumsList = () => {
  const { albums } = useContext(ImagesContext)

  return (
    <div className={styles.albumsList}>
      {albums.map((album) => (
        <AlbumListItem
          key={album._id}
          album={album}
        />
      ))}
      <p></p>
    </div>
  )
}

export default AlbumsList

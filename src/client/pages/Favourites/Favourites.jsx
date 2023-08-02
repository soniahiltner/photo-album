import { useContext } from 'react'
import Gallery from '../../components/Gallery/Gallery'
import styles from './Favourites.module.css'
import { ImagesContext } from '../../context/ImagesContext'
import Pagination from '../../components/Pagination/Pagination'

const Favourites = () => {
  const { favourites, favPage, favTotalPages } = useContext(ImagesContext)
  return (
    <div className={styles.favourites}>
      <Pagination
        pageNumber={favPage}
        total={favTotalPages}
      />
      <Gallery pictures={favourites} />
    </div>
  )
}

export default Favourites

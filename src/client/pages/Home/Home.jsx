import { useContext } from 'react'
import Gallery from '../../components/Gallery/Gallery'
import styles from './Home.module.css'
import { ImagesContext } from '../../context/ImagesContext'
import Pagination from '../../components/Pagination/Pagination'

const Home = () => {
  const { images, page, totalPages } = useContext(ImagesContext)
  return (
    <div className={styles.home}>
      <Pagination
        pageNumber={page}
        total={totalPages}
      />
      <Gallery pictures={images} />
    </div>
  )
}

export default Home

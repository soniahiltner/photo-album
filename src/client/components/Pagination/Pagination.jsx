import { useContext } from 'react'
import { ImagesContext } from '../../context/ImagesContext'
import styles from './Pagination.module.css'

const Pagination = ({ pageNumber, total }) => {
  const { prevPage, nextPage, firstPage, lastPage } = useContext(ImagesContext)
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        {total === 1 && <span>Page 1</span>}
        {total > 1 && (
          <span>
            Page {pageNumber} of {total}
          </span>
        )}
      </div>
      <div className={styles.paginationBtns}>
        <button
          className={`${pageNumber === 1 ? styles.disabled : ''}`}
          onClick={() => prevPage(pageNumber)}
        >
          &lt;
        </button>

        {total > 2 && (
          <button
            className={`${pageNumber === 1 ? styles.disabled : ''}`}
            onClick={() => firstPage(pageNumber)}
          >
            First
          </button>
        )}

        {total > 2 && (
          <button
            className={`${
              pageNumber === total ? styles.disabled : styles.lastBtn
            }`}
            onClick={() => lastPage(pageNumber)}
          >
            Last
          </button>
        )}

        <button
          className={`${pageNumber === total ? styles.disabled : ''}`}
          onClick={() => nextPage(pageNumber)}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default Pagination

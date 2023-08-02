import { useContext, useState } from 'react'
import styles from './CreateAlbumForm.module.css'
import { ImagesContext } from '../../context/ImagesContext'

const CreateAlbumForm = () => {
  const [albumName, setAlbumName] = useState('')
  const [error, setError] = useState('')
  const { albums, setAlbums } = useContext(ImagesContext)
  const url = 'http://localhost:3000/api/albums'

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAlbum = {
      name: albumName
    }
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAlbum)
    }

    const nameInAlbum = albums.filter((album) => album.name === albumName)

    if (albumName.length === 0) {
      setError('Not valid name')
      setTimeout(() => {
        setError('')
      }, 2000)
    } else if (nameInAlbum.length > 0) {
      setError('Album name already exists')
      setTimeout(() => {
        setError('')
      }, 2000)
      setAlbumName('')
    } else {
      fetch('api/albums', fetchOptions)
        .then(handleErrors)
        .then((res) => res.json())
        .then((data) => {
          setAlbums([...albums, data])
          setAlbumName('')
        })
        .catch((error) => console.log(error))
    }
  }

  function handleErrors(res) {
    if (!res.ok) {
      throw Error(res.statusText)
    }
    return res
  }

  return (
    <div className={styles.albumForm}>
      <form>
        <div className={styles.inputContainer}>
          <label htmlFor='name'>Add a new album</label>
          <input
            type='text'
            id='name'
            name='name'
            value={albumName}
            placeholder='album name'
            onChange={(e) => setAlbumName(e.target.value.toLowerCase())}
            required
          />
        </div>

        <button
          type='submit'
          onClick={handleSubmit}
        >
          Add
        </button>
        <div className={styles.errorMessage}>
          <span> {error} </span>
        </div>
      </form>
      <hr />
    </div>
  )
}

export default CreateAlbumForm

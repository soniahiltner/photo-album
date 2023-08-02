/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { ImagesContext } from '../../context/ImagesContext'
import styles from './AddToAlbumForm.module.css'

const AddToAlbumForm = ({ image, setOpenSelect }) => {
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const [error, setError] = useState('')
  const { albums, addToAlbumEndpoint } = useContext(ImagesContext)

  const options = albums.map((item) => {
    return { label: item.name, val: item.name }
  })

  //Add image to album
  const addImageToAlbum = async (image) => {
    const changedImage = {
      ...image,
      albums: [...image.albums, selectedAlbum]
    }

    const fetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changedImage)
    }

    if (selectedAlbum.length === 0) {
      setError('Choose an option')
    } else {
      await fetch(`${addToAlbumEndpoint}${image._id}`, fetchOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => console.log(error))

      setOpenSelect(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addImageToAlbum(image)
  }

  const handleChange = (e) => {
    setSelectedAlbum(e.target.value)
  }

  return (
    <div
      className={styles.selectFormContainer}
      onClick={() => setOpenSelect(false)}
    >
      <form
        className={styles.selectForm}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <label>Add to:</label>
        <select
          size='4'
          name='album'
          value={selectedAlbum}
          onChange={handleChange}
          required
        >
          <option value=''></option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option.val}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className={styles.btnSelectContainer}>
          <button type='submit'>Submit</button>
          <button onClick={() => setOpenSelect(false)}>Cancel</button>
        </div>
        <span className={styles.error}>{error}</span>
      </form>
    </div>
  )
}

export default AddToAlbumForm

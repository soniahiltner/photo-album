import { useState } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'

export const ImagesContext = createContext()

// eslint-disable-next-line react/prop-types
export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([])
  const [favourites, setFavourites] = useState([])
  const [albums, setAlbums] = useState([])
  const [page, setPage] = useState(1)
  const [favPage, setFavPage] = useState(1)
  const [count, setCount] = useState(0)
  const [favCount, setFavCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [favTotalPages, setFavTotalPages] = useState(0)

  const imagesEndpoint = '/api/images/'
  const favouritesEndpoint = '/api/images/favourites/'
  const albumImagesEndpoint = '/api/images/album/'
  const albumImageEndpoint = '/api/images/lastimage/'
  const albumsEndpoint = '/api/albums'
  const updateFavoriteEndpoint = '/api/images/updatefavourite/'
  const addToAlbumEndpoint = '/api/images/addtoalbum/'
  const deleteImageEndpoint = '/api/images/'
  const deleteAlbumEndpoint = '/api/albums/'
  const removeFromAlbumEndpoint = '/api/images/removefromalbum/'

  //Pagination
  const prevPage = (pag) => {
    if (pag === page) {
      setPage((prev) => prev - 1)
    }
    if (pag === favPage) {
      setFavPage((prev) => prev - 1)
    }
  }

  const nextPage = (pag) => {
    if (pag === page) {
      setPage((prev) => prev + 1)
    }
    if (pag === favPage) {
      setFavPage((prev) => prev + 1)
    }
  }
  const firstPage = (pag) => {
    if (pag === page) {
      setPage(1)
    }
    if (pag === favPage) {
      setFavPage(1)
    }
  }
  const lastPage = (pag) => {
    if (pag === page) {
      setPage(totalPages)
    }
    if (pag === favPage) {
      setFavPage(favTotalPages)
    }
  }

  //Get all images
  const getImages = async () => {
    fetch(`${imagesEndpoint}?page=${page}`)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
        res.json().then((data) => {
          setPage(data.page)
          setCount(data.count)
          setTotalPages(data.totalPages)
          setImages(data.images)
        })
      })

      .catch((err) => console.log('Error fetching the images:', err))
  }

  //Get favourites
  const getFavourites = async () => {
    fetch(`${favouritesEndpoint}?page=${favPage}`)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
        res.json().then((data) => {
          setFavPage(data.page)
          setFavTotalPages(data.totalPages)
          setFavourites(data.favourites)
        })
      })

      .catch((err) => console.log('Error fetching the images:', err))
  }

  //Get albums
  const getAlbums = async () => {
    fetch(albumsEndpoint)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
        res.json().then((data) => {
          setAlbums(data)
        })
      })
      .catch((err) => console.log('Error fetching albums', err))
  }

  useEffect(() => {
    getImages()
    getAlbums()
    getFavourites()
  }, [])

  useEffect(() => {
    getImages()
    getAlbums()
    getFavourites()
  }, [page, favPage])

  //Remove image from album
  const removeImgFromAlbum = async (image, album) => {
    
    const newAlbums = image.albums.filter((el) => el !== album.name)

    const changedImage = {
      ...image,
      albums: newAlbums
    }

    const fetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changedImage)
    }

    await fetch(
      `${removeFromAlbumEndpoint}?albumName=${album.name}&imageId=${image._id}`,
      fetchOptions
    )
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
        res.json().then((data) => {
          setImages(prev => [...prev, data.image])
          getImages()
        })
      })
      .catch((err) => console.log('Error removing image from album', err))
  }

  //Toggle favourite
  const toggleFavourite = async (image) => {
    
    const changedImage = {
      ...image,
      favourite: !image?.favourite
    }
    const id = image._id

    const fetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changedImage)
    }

    await fetch(`${updateFavoriteEndpoint}${id}`, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
        res.json().then(data => {
          setFavCount(data.favCount)
        })
        getImages()
        getFavourites()
      })
      .catch((err) => console.log('Error changing favourite state', err))
    getImages()
  }

  //Remove image  from database
  const removeImgFromDatabase = (image) => {
    fetch(`${deleteImageEndpoint}${image._id}`, { method: 'DELETE' }).then(
      async (res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
        getImages()
      }
    )
  }

  //Delete album
  const deleteAlbum = (album) => {
    fetch(`${deleteAlbumEndpoint}${album.name}`, { method: 'DELETE' }).then(
      async (res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`)
          return
        }
      }
    )
    getAlbums()
  }

  return (
    <ImagesContext.Provider
      value={{
        images,
        setImages,
        favourites,
        setFavourites,
        albums,
        setAlbums,
        getImages,
        toggleFavourite,
        removeImgFromDatabase,
        removeImgFromAlbum,
        deleteAlbum,
        albumImagesEndpoint,
        albumImageEndpoint,
        addToAlbumEndpoint,
        page,
        favPage,
        count,
        totalPages,
        favTotalPages,
        prevPage,
        nextPage,
        firstPage,
        lastPage
      }}
    >
      {children}
    </ImagesContext.Provider>
  )
}

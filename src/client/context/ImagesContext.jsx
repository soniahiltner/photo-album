import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

export const ImagesContext = createContext();

// eslint-disable-next-line react/prop-types
export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [albums, setAlbums] = useState([]);

  
  const imagesEndpoint = "/api/images/";
  const albumsEndpoint = "/api/albums/";
  const updateFavoriteEndpoint = "/api/updatefavourite/";
  const addToAlbumEndpoint = "/api/addtoalbum/";
  const deleteImageEndpoint = "/api/deleteimage/";
  const deleteAlbumEndpoint = "/api/deletealbum/";
  const removeFromAlbumEndpoint = "/api/removefromalbum/";

  //Get all images
  const getImages = () => {
    fetch(imagesEndpoint)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`);
          return;
        }
        res.json().then((data) => {
          setImages(data);
          const favouritesImg = data.filter(
            (image) => image.favourite === true
          );
          setFavourites(favouritesImg);
        });
      })

      .catch((err) => console.log("Error fetching the images:", err));
  };

  //Get albums
  const getAlbums = () => {
    fetch(albumsEndpoint)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`);
          return;
        }
        res.json().then((data) => {
          setAlbums(data);
        });
      })
      .catch((err) => console.log("Error fetching albums", err));
  };

  useEffect(() => {
    getImages();
    getAlbums();
  }, []);

  // Get album's images
  const getImagesAlbum = (album) => {
    const imagesInAlbum = images?.filter((img) =>
      img.albums.includes(album?.name)
    );
    if (imagesInAlbum.length > 0) {
      return imagesInAlbum;
    }
    return [];
  };

  //Add image to album
  const addImageToAlbum = async (image, album) => {
    const imageToChange = images.find((item) => item._id === image._id);
    const changedImage = {
      ...imageToChange,
      albums: [...imageToChange.albums, album],
    };

    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changedImage),
    };

    await fetch(`${addToAlbumEndpoint}${image._id}`, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`);
          return;
        }
        res.json().then((data) => {
          setImages(images.map((img) => (img.id !== image._id ? img : data)));
        });
      })
      .catch((error) => console.log(error));
  };

  //Remove image from album
  const removeImgFromAlbum = async (image, album) => {
    const imageToChange = images.find((item) => item._id === image._id);
    const newAlbums = imageToChange.albums.filter((el) => el !== album.name);

    const changedImage = {
      ...imageToChange,
      albums: newAlbums,
    };

    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changedImage),
    };

    await fetch(
      `${removeFromAlbumEndpoint}?albumName=${album.name}&imageId=${image._id}`,
      fetchOptions
    )
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`);
          return;
        }
        res.json().then((data) => {
          setImages(images.map((img) => (img.id !== image._id ? img : data)));
          getImages();
        });
      })
      .catch((err) => console.log("Error removing image from album", err));
  };

  //Toggle favourite in the gallery
  const toggleFavourite = async (image) => {
    const imageToChange = images.find((item) => item._id === image._id);
    const changedImage = {
      ...imageToChange,
      favourite: !imageToChange.favourite,
    };

    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changedImage),
    };

    await fetch(`${updateFavoriteEndpoint}${image._id}`, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`);
          return;
        }
        res.json().then((data) => {
          setImages(images.map((img) => (img.id !== image._id ? img : data)));
          getImages();
        });
      })
      .catch((err) => console.log("Error changing favourite state", err));
  };

  //Remove image  from database
  const removeImgFromDatabase = (image) => {
    fetch(`${deleteImageEndpoint}${image._id}`, { method: "DELETE" }).then(
      async (res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`);
          return;
        }
        getImages();
      }
    );
  };

  //Delete album
  const deleteAlbum = (album) => {
    fetch(`${deleteAlbumEndpoint}${album.name}`, { method: "DELETE" }).then(
      async (res) => {
        if (!res.ok) {
          console.log(`Error with Status Code: ${res.status}`);
          return;
        }
      }
    );
    getAlbums();
  };

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
        getImagesAlbum,
        toggleFavourite,
        removeImgFromDatabase,
        removeImgFromAlbum,
        addImageToAlbum,
        deleteAlbum,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

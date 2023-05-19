import styles from "./AlbumsList.module.css";
import { useContext } from "react";
import { ImagesContext } from "../../context/ImagesContext";
import { Link } from "react-router-dom";
import DeleteAlbum from "../DeleteAlbum/DeleteAlbum";

const AlbumsList = () => {
  const { albums, getImagesAlbum } = useContext(ImagesContext);

  return (
    <div className={styles.albumsList}>
      {albums.map((album) => (
        <div key={album._id} className={styles.albumContainer}>
          <div className={styles.header}>
            <h2>{album.name}</h2>
            <DeleteAlbum album={album} />
          </div>

          {getImagesAlbum(album).length === 0 && (
            <div className={styles.emptyAlbum} >
              <span>Empty album</span>
            </div>
          )}
          {getImagesAlbum(album).length > 0 && (
            <Link to={`/albums/${album._id}`}>
              <div className={styles.albumImageLink}>
                <img
                  src={
                    getImagesAlbum(album)[getImagesAlbum(album).length - 1].url
                  }
                />
              </div>
            </Link>
          )}
        </div>
      ))}
      <p></p>
    </div>
  );
};

export default AlbumsList;

import { useParams } from "react-router-dom";
import styles from "./Album.module.css";
import { useContext } from "react";
import { ImagesContext } from "../../context/ImagesContext";
import Gallery from "../../components/Gallery/Gallery";

const Album = () => {
  const { albums, getImagesAlbum } = useContext(ImagesContext);
  const { id } = useParams();
  //console.log(id);
  const album = albums.find((item) => item._id === id);
  //console.log(album);

  const images = getImagesAlbum(album);

  return (
    <div className={styles.album}>
      <h1>{album?.name} </h1>
      <Gallery pictures={images} album={album} />
    </div>
  );
};

export default Album;

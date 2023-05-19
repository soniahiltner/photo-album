/* eslint-disable react/prop-types */
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import RemoveImageFromAlbum from "../RemoveImageFromAlbum/RemoveImageFromAlbum";
import styles from "./AlbumImage.module.css";

const AlbumImage = ({ image, index, album, handleOpenModal }) => {
  return (
    <div className={styles.gallery}>
      <img
        src={image?.url}
        alt={image.filename}
        onClick={() => handleOpenModal(index)}
      />
      <div className={styles.icons}>
        <FavouriteIcon image={image} />
        <RemoveImageFromAlbum image={image} album={album} />
      </div>
    </div>
  );
};

export default AlbumImage;
/* eslint-disable react/prop-types */
import styles from "./Image.module.css";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import AddToAlbum from "../AddToAlbum/AddToAlbum";
import RemoveImageFromDatabase from "../RemoveImageFromDatabase/RemoveImageFromDatabase";

const Image = ({ image, index, handleOpenModal }) => {

  return (
    <div className={styles.gallery}>
      <img
        src={image?.url}
        alt={image.filename}
        onClick={() => handleOpenModal(index)}
      />
      <div className={styles.icons}>
        <FavouriteIcon image={image} />
        <AddToAlbum image={image} />
        <RemoveImageFromDatabase image={image} />
      </div>
    </div>
  );
};

export default Image;

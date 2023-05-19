/* eslint-disable react/prop-types */
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import styles from "./FavouriteImage.module.css";

const FavouriteImage = ({ image, index, handleOpenModal }) => {
  return (
    <div className={styles.gallery}>
      <img
        src={image?.url}
        alt={image.filename}
        onClick={() => handleOpenModal(index)}
      />
      <div className={styles.icons}>
        <FavouriteIcon image={image} />
      </div>
    </div>
  );
};

export default FavouriteImage;

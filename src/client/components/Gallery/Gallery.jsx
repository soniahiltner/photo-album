/* eslint-disable react/prop-types */
import styles from "./Gallery.module.css";
import { useContext } from "react";
import { ImagesContext } from "../../context/ImagesContext";
import { useState } from "react";
import Image from "../Image/Image";
import FavouriteImage from "../FavouriteImage/FavouriteImage";
import AlbumImage from "../AlbumImage/AlbumImage";

const Gallery = ({ pictures, album }) => {
  const { images, favourites } = useContext(ImagesContext);

  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePrev = () => {
    if (slideNumber === 0) {
      setSlideNumber(pictures.length - 1);
    } else {
      setSlideNumber(slideNumber - 1);
    }
  };

  const handleNext = () => {
    if (slideNumber + 1 === pictures.length) {
      setSlideNumber(0);
    } else {
      setSlideNumber(slideNumber + 1);
    }
  };

  return (
    <div className={styles.container}>
      {/* modal */}
      {openModal && (
        <div className={styles.sliderContainer}>
          <span className={styles.closeBtn} onClick={handleCloseModal}>
            X
          </span>
          <span className={styles.prevBtn} onClick={handlePrev}>
            <i className="fa fa-chevron-left"></i>
          </span>
          <span className={styles.nextBtn} onClick={handleNext}>
            <i className="fa fa-chevron-right"></i>
          </span>

          <div className={styles.fullScreen}>
            <img src={pictures[slideNumber].url} />
          </div>
        </div>
      )}

      <div className={styles.galleryContainer}>
        {pictures === images &&
          pictures?.map((image, index) => (
            <Image
              key={image._id}
              image={image}
              index={index}
              handleOpenModal={handleOpenModal}
            />
          ))}
        {pictures === favourites &&
          pictures?.map((image, index) => (
            <FavouriteImage
              key={image._id}
              image={image}
              index={index}
              handleOpenModal={handleOpenModal}
            />
          ))}
        {pictures !== images &&
          pictures !== favourites &&
          pictures?.map((image, index) => (
            <AlbumImage
              key={image._id}
              image={image}
              index={index}
              album={album}
              handleOpenModal={handleOpenModal}
            />
          ))}
      </div>
    </div>
  );
};

export default Gallery;

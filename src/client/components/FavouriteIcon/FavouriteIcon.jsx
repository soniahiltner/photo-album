/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { ImagesContext } from "../../context/ImagesContext";
import styles from "./FavouriteIcon.module.css";
import Tooltip from "../Tooltip/Tooltip";

const FavouriteIcon = ({ image }) => {
  const [hovering, setHovering] = useState(false);
  const {  toggleFavourite } = useContext(ImagesContext);
  const isFavourite = image.favourite
  

  const mouseOver = () => setHovering(true);
  const mouseOut = () => setHovering(false);

  return (
    <span
      className={`${isFavourite ? styles.favStar : styles.noFav}`}
      onClick={() => toggleFavourite(image)}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <i className='fa fa-star'></i>
      {hovering && (
        <Tooltip
          text='Favourite'
          position='bottom'
        />
      )}
    </span>
  )
};

export default FavouriteIcon;

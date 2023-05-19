/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import styles from "./RemoveImageFromAlbum.module.css";
import { ImagesContext } from "../../context/ImagesContext";
import Tooltip from "../Tooltip/Tooltip";

const RemoveImageFromAlbum = ({ image, album }) => {

  const [hovering, setHovering] = useState(false);
  const { removeImgFromAlbum } = useContext(ImagesContext);

  const mouseOver = () => setHovering(true);
  const mouseOut = () => setHovering(false);

  return (
    <span
      className={styles.binButton}
      onClick={() => removeImgFromAlbum(image, album)}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <i className="fa fa-trash"></i>
      {hovering && <Tooltip text="Delete" position='bottom'/>}
    </span>
  );
};

export default RemoveImageFromAlbum;

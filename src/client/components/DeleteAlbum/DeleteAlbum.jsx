/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { ImagesContext } from "../../context/ImagesContext";
import styles from "./DeleteAlbum.module.css";
import Tooltip from "../Tooltip/Tooltip";

const DeleteAlbum = ({ album }) => {

  const [hovering, setHovering] = useState(false);
  const { deleteAlbum } = useContext(ImagesContext);

  const mouseOver = () => setHovering(true);
  const mouseOut = () => setHovering(false);

  return (
    <span
      className={styles.binButton}
      onClick={() => deleteAlbum(album)}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <i className="fa fa-trash"></i>
      {hovering && <Tooltip text="Delete" position='top'/>}
    </span>
  );
};

export default DeleteAlbum;

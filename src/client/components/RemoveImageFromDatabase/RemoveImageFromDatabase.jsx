/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { ImagesContext } from "../../context/ImagesContext";
import styles from "./RemoveImageFromDatabase.module.css";
import Tooltip from "../Tooltip/Tooltip";

const RemoveImageFromDatabase = ({ image }) => {

  const [hovering, setHovering] = useState(false);
  const { removeImgFromDatabase } = useContext(ImagesContext);

   const mouseOver = () => setHovering(true);
   const mouseOut = () => setHovering(false);

  return (
    <span
      className={styles.binButton}
      onClick={() => removeImgFromDatabase(image)}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <i className="fa fa-trash"></i>
      {hovering && <Tooltip text="Delete" position="bottom" />}
    </span>
  );
};

export default RemoveImageFromDatabase;

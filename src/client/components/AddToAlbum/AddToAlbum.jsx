import styles from "./AddToAlbum.module.css";

import AddToAlbumForm from "../AddToAlbumForm/AddToAlbumForm";
import { useState } from "react";
import Tooltip from "../Tooltip/Tooltip";

// eslint-disable-next-line react/prop-types
const AddToAlbum = ({ image }) => {

  const [openSelect, setOpenSelect] = useState(false);
  const [hovering, setHovering] = useState(false);

  const openSelectModal = () => {
    setOpenSelect(true);
  };

  const mouseOver = () => setHovering(true);
  const mouseOut = () => setHovering(false);

  return (
    <div className={styles.addToAlbumContainer}>
      <span
        className={styles.addToAlbum}
        onClick={openSelectModal}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
      >
        <i className="fa fa-folder-plus"></i>
      </span>
      {hovering && <Tooltip text="Add to" position="bottom" />}
      {openSelect && (
        <AddToAlbumForm image={image} setOpenSelect={setOpenSelect} />
      )}
    </div>
  );
};

export default AddToAlbum;

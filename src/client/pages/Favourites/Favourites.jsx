import { useContext } from "react";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./Favourites.module.css";
import { ImagesContext } from "../../context/ImagesContext";

const Favourites = () => {
  const { favourites } = useContext(ImagesContext);
  return (
    <div className={styles.favourites}>
      <Gallery pictures={favourites} />
    </div>
  );
};

export default Favourites;

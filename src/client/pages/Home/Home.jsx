import { useContext } from "react";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./Home.module.css";
import { ImagesContext } from "../../context/ImagesContext";

const Home = () => {
  const { images } = useContext(ImagesContext);
  return (
    <div className={styles.home}>
      <Gallery pictures={images} />
    </div>
  );
};

export default Home;

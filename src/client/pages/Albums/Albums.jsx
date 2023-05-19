
import CreateAlbumForm from "../../components/CreateAlbumForm/CreateAlbumForm";
import AlbumsList from "../../components/AlbumList/AlbumsList";
import styles from "./Albums.module.css";

const Albums = () => {
  return (
    <div className={styles.albums}>
      <CreateAlbumForm />
      <AlbumsList />
    </div>
  );
};

export default Albums;
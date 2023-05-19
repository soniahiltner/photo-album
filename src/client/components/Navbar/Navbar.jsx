import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import UploadForm from "../UploadForm/UploadForm";

const Navbar = () => {
  const styleNavLink = ({ isActive }) => {
    return {
      color: isActive ? "red" : "blueviolet",
    };
  };
  return (
    <div className={styles.navbar}>
      <nav>
        <div className={styles.navLinks}>
          <NavLink to={"/"} style={styleNavLink}>
            My Pictures
          </NavLink>
          <NavLink to={"/favourites"} style={styleNavLink}>
            My Favourites
          </NavLink>
          <NavLink to={"/albums"} style={styleNavLink}>
            My Albums
          </NavLink>
        </div>
      </nav>
      <UploadForm />
    </div>
  );
};

export default Navbar;

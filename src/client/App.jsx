import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Favourites from "./pages/Favourites/Favourites";
import Albums from "./pages/Albums/Albums";
import Album from "./pages/Album/Album";
import { ImagesProvider } from "./context/ImagesContext";


function App() {
  return (
    <ImagesProvider>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:id" element={<Album />} />
          </Routes>
        </div>
      </div>
    </ImagesProvider>
  );
}

export default App;

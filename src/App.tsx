import { useEffect } from "react";
import "./App.css";
import Gallery from "./pages/Gallery";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "./utils/localStorage";
import { galleryData } from "./utils/data";

function App() {
  useEffect(() => {
    if (!getDataFromLocalStorage("gallery")) {
      setDataInLocalStorage("gallery", galleryData);
    }
  }, []);

  return (
    <main>
      <Gallery />
    </main>
  );
}

export default App;

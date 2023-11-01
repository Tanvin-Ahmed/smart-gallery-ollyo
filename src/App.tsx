import { lazy } from "react";
import "./App.css";
import LazyLoader from "./components/LazyLoader";
const Gallery = LazyLoader(lazy(() => import("./pages/Gallery")));

function App() {
  return (
    <main className="bg-blue-50">
      <Gallery />
    </main>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GalleryContext from "./context/GalleryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GalleryContext>
      <App />
    </GalleryContext>
  </React.StrictMode>
);

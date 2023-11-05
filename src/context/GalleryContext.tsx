import { useState, useEffect, ReactNode, FC } from "react";
import { ImageDataType } from "../types";
import { CreateGalleryContext } from "./createGalleryContext";
import { galleryData } from "../utils/data";

interface GalleryContextProps {
  children: ReactNode;
}

const GalleryContext: FC<GalleryContextProps> = ({ children }) => {
  const [images, setImages] = useState<ImageDataType[] | []>([]);
  const [selectedImages, setSelectedImages] = useState<string[] | []>([]);

  // if data already exists in local storage then load them in local state
  useEffect(() => {
    const data = galleryData;
    if (data) {
      setImages(data);
    }
  }, []);

  return (
    <CreateGalleryContext.Provider
      value={{ images, setImages, selectedImages, setSelectedImages }}
    >
      {children}
    </CreateGalleryContext.Provider>
  );
};

export default GalleryContext;

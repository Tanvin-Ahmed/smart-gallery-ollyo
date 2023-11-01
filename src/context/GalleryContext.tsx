import { useState, useEffect, ReactNode, FC } from "react";
import { ImageDataType } from "../types";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { galleryData } from "../utils/data";
import { CreateGalleryContext } from "./createGalleryContext";

interface GalleryContextProps {
  children: ReactNode;
}

const GalleryContext: FC<GalleryContextProps> = ({ children }) => {
  const [images, setImages] = useState<ImageDataType[] | []>([]);
  const [selectedImages, setSelectedImages] = useState<string[] | []>([]);
  const [trackImagesLength, setTrackImagesLength] = useState<number>(0);

  // if data already exists in local storage then load them in local state
  useEffect(() => {
    const data = getDataFromLocalStorage("gallery");
    if (data) {
      setImages(data);
      setTrackImagesLength(data.length);
    }
  }, []);

  // if data already doesn't exists in local storage then save in local storage and load in local state
  useEffect(() => {
    if (!getDataFromLocalStorage("gallery")) {
      setDataInLocalStorage("gallery", galleryData);
      setImages(galleryData);
      setTrackImagesLength(galleryData.length);
    }
  }, []);

  // if images state's value change then automatically update the local storage data
  useEffect(() => {
    if (trackImagesLength !== images.length) {
      setDataInLocalStorage("gallery", images);
      setTrackImagesLength(images.length);
    }
  }, [images, trackImagesLength]);

  return (
    <CreateGalleryContext.Provider
      value={{ images, setImages, selectedImages, setSelectedImages }}
    >
      {children}
    </CreateGalleryContext.Provider>
  );
};

export default GalleryContext;

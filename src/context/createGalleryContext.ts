import { createContext } from "react";
import { ImageDataType } from "../types";

interface GalleryContextData {
  images: ImageDataType[] | [];
  setImages: React.Dispatch<React.SetStateAction<ImageDataType[]>>;
  selectedImages: string[] | [];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultGalleryContextData: GalleryContextData = {
  images: [],
  setImages: () => {},
  selectedImages: [],
  setSelectedImages: () => {},
};

export const CreateGalleryContext = createContext<GalleryContextData>(
  defaultGalleryContextData
);

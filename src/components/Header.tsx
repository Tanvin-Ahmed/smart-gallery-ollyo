import React from "react";
import { setDataInLocalStorage } from "../utils/localStorage";
import { ImageDataType } from "../types";
import { Trash, RefreshCcw } from "lucide-react";
import { galleryData } from "../utils/data";

interface HeaderProps {
  images: ImageDataType[];
  selectedImages: string[];
  setImages: React.Dispatch<React.SetStateAction<ImageDataType[] | []>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[] | []>>;
}

const Header: React.FC<HeaderProps> = ({
  images,
  selectedImages,
  setImages,
  setSelectedImages,
}) => {
  const handleDelete = () => {
    const data = images.filter((image) => !selectedImages.includes(image.id));
    setDataInLocalStorage("gallery", data);
    setImages(data);
    setSelectedImages([]);
  };

  const handleRefresh = () => {
    const data = galleryData;
    setDataInLocalStorage("gallery", data);
    setImages(data);
  };

  return (
    <div className="flex justify-between items-center">
      {selectedImages.length > 0 ? (
        <h5 className="text-3xl font-bold">
          {selectedImages.length} {selectedImages.length > 1 ? "Files" : "File"}{" "}
          Selected
        </h5>
      ) : (
        <h5 className="text-3xl font-bold">Gallery</h5>
      )}
      <div className="flex justify-center items-center gap-3">
        <button
          type="button"
          className="border-none bg-gray-100 transition-all hover:bg-gray-200 p-2 rounded-full"
          onClick={handleRefresh}
        >
          <RefreshCcw size={18} />
        </button>
        <button
          type="button"
          className="rounded border-none bg-red-500 text-white py-2 px-4 flex justify-center items-center gap-x-3"
          onClick={handleDelete}
        >
          <Trash size={18} /> Delete
        </button>
      </div>
    </div>
  );
};

export default Header;

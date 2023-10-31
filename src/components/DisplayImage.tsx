import React from "react";
import Image from "./Image";
import { ImageDataType } from "../types";
import Overlay from "./Overlay";

interface DisplayImageProps {
  images: ImageDataType[];
  selectedImages: string[];
  setImages: React.Dispatch<React.SetStateAction<ImageDataType[] | []>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[] | []>>;
}

const DisplayImage: React.FC<DisplayImageProps> = ({
  images,
  setImages,
  setSelectedImages,
  selectedImages,
}) => {
  const handleSelectImage = (imageId: string) => {
    setSelectedImages((prevSelectedImageIds: string[]) => {
      if (prevSelectedImageIds.includes(imageId)) {
        // Remove the image ID if it's already in the array
        return prevSelectedImageIds.filter((id) => id !== imageId);
      }
      return [...prevSelectedImageIds, imageId];
    });
  };

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      {images.map((img: ImageDataType, index: number) => (
        <div
          key={img.id}
          className={`${
            index === 0 && "sm:row-span-2 sm:col-span-2"
          } relative group`}
        >
          <Overlay
            handleSelectImage={handleSelectImage}
            id={img.id}
            selectedImages={selectedImages}
          />
          <Image
            src={img.url}
            alt={`${index + 1} img`}
            height={"100%"}
            width={"100%"}
            className="rounded border shadow cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayImage;

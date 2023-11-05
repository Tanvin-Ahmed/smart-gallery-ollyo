import React, { useContext, useState } from "react";
import Image from "./Image";
import { ImageDataType } from "../../types";
import Overlay from "./Overlay";
import { CreateGalleryContext } from "../../context/createGalleryContext";
import Dropzone from "./Dropzone";

const DisplayImage = () => {
  const galleryContext = useContext(CreateGalleryContext);
  const [draggedImage, setDraggedImage] = useState<ImageDataType | null>(null);

  if (!galleryContext) {
    return null;
  }

  const { images, setImages, selectedImages, setSelectedImages } =
    galleryContext;

  const handleSelectImage = (imageId: string) => {
    setSelectedImages((prevSelectedImageIds: string[]) => {
      if (prevSelectedImageIds.includes(imageId)) {
        // Remove the image ID if it's already in the array
        return prevSelectedImageIds.filter((id) => id !== imageId);
      }
      return [...prevSelectedImageIds, imageId];
    });
  };

  const handleDragStart = (data: ImageDataType) => {
    setDraggedImage(data);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (!draggedImage) return;

    if (id !== draggedImage.id) {
      // if selected image is dragged over another image position
      setImages((pre: ImageDataType[]) => {
        const images = [...pre];
        const draggedIndex = images.findIndex(
          (img) => img.id === draggedImage.id
        );
        const dropIndex = images.findIndex((img) => img.id === id);

        // Remove the dragged image from the list
        images.splice(draggedIndex, 1);

        // Add the updated dragged image back at the new position
        images.splice(dropIndex, 0, draggedImage);

        return images;
      });
    }
  };

  const handleDrop = () => {
    setDraggedImage(null);
  };

  // for mobile devices
  const handleTouchMove = (e: React.TouchEvent, id: string) => {
    e.preventDefault();
    if (!draggedImage) return;

    if (id !== draggedImage.id) {
      // if selected image is dragged over another image position
      setImages((pre: ImageDataType[]) => {
        const images = [...pre];
        const draggedIndex = images.findIndex(
          (img) => img.id === draggedImage.id
        );
        const dropIndex = images.findIndex((img) => img.id === id);

        // Remove the dragged image from the list
        images.splice(draggedIndex, 1);

        // Add the updated dragged image back at the new position
        images.splice(dropIndex, 0, draggedImage);

        return images;
      });
    }
  };

  return (
    <div className="p-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 transition-all">
      {images.map((img: ImageDataType, index: number) => (
        <div
          key={img.id}
          className={`${
            index === 0 && "sm:row-span-2 sm:col-span-2"
          } relative group m-0 p-0 w-full h-full border transition-all rounded ${
            img.url === "" && "scale-105 shadow-lg"
          }`}
          onDragOver={(e) => handleDragOver(e, img.id)}
          onTouchMove={(e) => handleTouchMove(e, img.id)}
          onTouchEnd={handleDrop}
          onDrop={handleDrop}
        >
          <div
            className="w-full h-full rounded"
            draggable
            onDragStart={() => handleDragStart(img)}
            onTouchStart={() => handleDragStart(img)}
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
              className={`rounded cursor-pointer w-full h-full object-cover `}
            />
          </div>
        </div>
      ))}
      <Dropzone />
    </div>
  );
};

export default DisplayImage;

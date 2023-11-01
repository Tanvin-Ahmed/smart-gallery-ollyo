import React, { useContext, useState } from "react";
import Image from "./Image";
import { ImageDataType } from "../../types";
import Overlay from "./Overlay";
import { v4 as uuidV4 } from "uuid";
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

  const handleDragStart = (e: React.DragEvent, data: ImageDataType) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("imageId", data.id);
      setDraggedImage(data);
    }
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (id === draggedImage?.id) {
      setImages((pre: ImageDataType[]) => {
        const images = [...pre];
        return images.filter((img) => img.url !== "");
      });
    } else {
      setImages((pre: ImageDataType[]) => {
        let images = [...pre];
        const index = images.findIndex((img) => img.id === id);
        if (images[index].url === "") return images;
        // remove if previous placeholder is exist (empty image)
        images = images.filter((img) => img.url !== "");
        // add new placeholder for new position (empty image)
        images.splice(index, 0, { id: uuidV4(), url: "" });
        return images;
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    const imgId = e.dataTransfer.getData("imageId");
    const targetIndex = images.findIndex((img) => img.id === imgId);

    if (targetIndex !== -1) {
      // Create a copy of the images array
      const updatedImages = [...images];
      updatedImages.splice(targetIndex, 1);

      // Remove the placeholder (empty image) if it exists
      const placeholderIndex = updatedImages.findIndex((img) => img.url === "");
      if (placeholderIndex !== -1) {
        updatedImages.splice(placeholderIndex, 1, images[targetIndex]);
      }

      // Set the updated images array
      setImages(updatedImages);
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
          // onDragLeave={() => handleDragLeave(img.id)}
          onDrop={handleDrop}
        >
          {img.url && (
            <div
              className="w-full h-full rounded"
              draggable
              onDragStart={(e) => handleDragStart(e, img)}
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
                className="rounded cursor-pointer w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      ))}
      <Dropzone />
    </div>
  );
};

export default DisplayImage;

import { useContext } from "react";
import Image from "./Image";
import { ImageDataType } from "../../types";
import Overlay from "./Overlay";
import { CreateGalleryContext } from "../../context/createGalleryContext";
import Dropzone from "./Dropzone";
import SortableList, { SortableItem } from "../EasySort/index";
import { arrayMoveImmutable } from "array-move";

const DropTarget = () => {
  return (
    <div
      className={`relative group m-0 p-0 w-full h-full border border-gray-400 rounded scale-105 shadow-lg`}
    />
  );
};

const DisplayImage = () => {
  const galleryContext = useContext(CreateGalleryContext);

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

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setImages((images: ImageDataType[]) =>
      arrayMoveImmutable(images, oldIndex, newIndex)
    );
  };

  return (
    <SortableList onSortEnd={onSortEnd} dropTarget={<DropTarget />}>
      <div className="relative p-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {images.map((img: ImageDataType, index: number) => (
          <SortableItem key={img.id}>
            <div
              className={`${
                index === 0 && "sm:row-span-2 sm:col-span-2"
              } relative group m-0 p-0 border rounded border-gray-300`}
            >
              <div className={`rounded w-full h-full`}>
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
            </div>
          </SortableItem>
        ))}
        <Dropzone />
      </div>
    </SortableList>
  );
};

export default DisplayImage;

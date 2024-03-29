import { useContext } from "react";
import { Trash } from "lucide-react";
import { CreateGalleryContext } from "../../context/createGalleryContext";
import Image from "./Image";

const Header = () => {
  const { images, setImages, selectedImages, setSelectedImages } =
    useContext(CreateGalleryContext);

  const handleDelete = () => {
    const selectedImagesId = [...selectedImages];
    const data = images.filter((image) => !selectedImagesId.includes(image.id));
    setImages(data);
    setSelectedImages([]);
  };

  return (
    <div className="flex justify-between items-center">
      {selectedImages.length > 0 ? (
        <h5 className="text-3xl font-bold">
          {selectedImages.length} {selectedImages.length > 1 ? "Files" : "File"}{" "}
          Selected
        </h5>
      ) : (
        <div className="flex justify-center items-center gap-3">
          <Image
            src="/logo.png"
            alt="logo"
            className="rounded-full w-10 h-10 object-cover"
          />
          <h5 className="text-3xl font-bold">Smart Gallery</h5>
        </div>
      )}
      {selectedImages.length > 0 && (
        <button
          type="button"
          className="rounded border-none bg-red-500 text-white py-2 px-4 flex justify-center items-center gap-x-3"
          onClick={handleDelete}
        >
          <Trash size={18} /> Delete {selectedImages.length}{" "}
          {selectedImages.length > 1 ? "Files" : "File"}
        </button>
      )}
    </div>
  );
};

export default Header;

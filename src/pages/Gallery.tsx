import { useEffect, useState } from "react";
import DisplayImage from "../components/DisplayImage";
import { getDataFromLocalStorage } from "../utils/localStorage";
import Header from "../components/Header";
import { ImageDataType } from "../types";

const Gallery = () => {
  const [images, setImages] = useState<ImageDataType[] | []>([]);
  const [selectedImages, setSelectedImages] = useState<string[] | []>([]);

  useEffect(() => {
    const data = getDataFromLocalStorage("gallery");
    if (data) {
      setImages(data);
    }
  }, []);

  return (
    <section className="container mx-auto">
      <div className="p-5">
        <Header
          images={images}
          setImages={setImages}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
        <hr className="text-gray-500 my-5 block" />
        <DisplayImage
          images={images}
          setImages={setImages}
          setSelectedImages={setSelectedImages}
          selectedImages={selectedImages}
        />
      </div>
    </section>
  );
};

export default Gallery;

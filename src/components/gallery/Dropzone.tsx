import { useContext, useEffect } from "react";
import { Image } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { CreateGalleryContext } from "../../context/createGalleryContext";
import { v4 as uuidV4 } from "uuid";

const Dropzone = () => {
  const { setImages } = useContext(CreateGalleryContext);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/*": [],
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const newImages = acceptedFiles.map((file) => ({
        id: uuidV4(),
        url: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  }, [acceptedFiles, setImages]);

  return (
    <div className="rounded w-full h-full p-2 border border-dashed border-gray-500 bg-gray-50">
      <div {...getRootProps({ className: "dropzone w-full h-full" })}>
        <input {...getInputProps()} />
        <div className="w-full h-full flex justify-center flex-col items-center relative">
          <Image size={30} color="black" />
          <p className="font-semibold">Add Images</p>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;

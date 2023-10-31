import React from "react";

interface OverlayProps {
  selectedImages: string[];
  handleSelectImage: (id: string) => void;
  id: string;
}

const Overlay: React.FC<OverlayProps> = ({
  selectedImages,
  handleSelectImage,
  id,
}) => {
  return selectedImages.includes(id) ? (
    <div className="cursor-pointer rounded overlay absolute inset-0 bg-gray-200 opacity-50 transition-opacity duration-300 ease-in-out z-20">
      <div className="py-5">
        <input
          type="checkbox"
          className="cursor-pointer h-6 w-16"
          defaultChecked={true}
          onChange={() => handleSelectImage(id)}
        />
      </div>
    </div>
  ) : (
    <div className="cursor-pointer rounded overlay absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out z-20">
      <div className="py-5">
        <input
          type="checkbox"
          className="cursor-pointer h-6 w-16"
          defaultChecked={false}
          onChange={() => handleSelectImage(id)}
        />
      </div>
    </div>
  );
};

export default Overlay;

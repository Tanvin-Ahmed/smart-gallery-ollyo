import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../assets/placeholder/placeholder.jpg";
import React, { MouseEventHandler } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement> | undefined;
  style?: object;
  height?: number | string;
  width?: number | string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  onClick,
  style,
  height,
  width,
}) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      height={height}
      width={width}
      className={className}
      placeholderSrc={placeholder}
      onClick={onClick}
      style={style}
    />
  );
};

export default Image;

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IMAGES } from "@/app/(projects)/memory-movie/constants";

interface ImageContextType {
  images: string[];
  replacementImages: string[];
  replaceImage: (index: number, replacementIndex?: number) => void;
}

const ImageContext = createContext<ImageContextType | null>(null);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const initialShown = IMAGES.slice(0, 35);
  const initialNotShown = IMAGES.slice(35);

  const [images, setImages] = useState(initialShown);
  const [replacementImages, setReservedImages] = useState(initialNotShown);

  const replaceImage = (index: number, replacementIndex: number = -1) => {
    if (index < 0 || index >= images.length) return;

    // const currentImage = images[index];

    const randomIndex =
      replacementIndex === -1
        ? Math.floor(Math.random() * replacementImages.length)
        : replacementIndex;
    // const replacementImage = replacementImages[randomIndex];

    // Swap elements in-place
    const updatedImages = [...images];
    const updatedReplacementImages = [...replacementImages];

    [updatedImages[index], updatedReplacementImages[randomIndex]] = [
      updatedReplacementImages[randomIndex],
      updatedImages[index],
    ];

    // Trigger state updates only if necessary
    setImages(updatedImages);
    setReservedImages(updatedReplacementImages);

    // const newShown = [...images];
    // const newNotShown = [...replacementImages];

    // newShown[index] = replacementImage;
    // newNotShown[randomIndex] = currentImage;

    // setImages(newShown);
    // setReservedImages(newNotShown);
  };

  const contextValue = {
    images,
    replacementImages,
    replaceImage,
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};

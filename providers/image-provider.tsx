"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IMAGES } from "@/app/memory-movie/constants";

interface ImageContextType {
  images: string[];
  replacementImages: string[];
  getReplacementImage: () => Promise<string | false>;
  replaceImage: (index: number, replacementIndex?: number) => void;
}

const ImageContext = createContext<ImageContextType | null>(null);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const initialShown = IMAGES.slice(0, 35);
  const initialNotShown = IMAGES.slice(35);

  const [replacementIndeces, setReplacementIndeces] = useState(
    Array.from({ length: initialNotShown.length }, (_, index) => index)
  );
  const [replacementImages] = useState(initialNotShown);
  const [images, setImages] = useState(initialShown);

  const imageLoader = (image: string, onSuccess: () => void) => {
    const img = new Image();
    img.src = `/memory-movie/memories/${image}`;
    img.onload = () => {
      onSuccess();
    };
    img.onerror = (err) => {
      console.log("Error in loading image: ", err);
      // do nothing
    };
  };

  const replaceImage = (index: number) => {
    if (index < 0 || index >= images.length) return;

    const tempReplacementIndeces = [...replacementIndeces];
    const newImageIndex = tempReplacementIndeces.shift();
    tempReplacementIndeces.push(newImageIndex!);
    setReplacementIndeces(tempReplacementIndeces);

    const newShown = [...images];

    const imageName = replacementImages[newImageIndex!];
    newShown[index] = imageName;

    imageLoader(imageName, () => {
      setImages(newShown);
    });
  };

  const getReplacementImage = (): Promise<string | false> => {
    const image = replacementImages[replacementIndeces[0]];

    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = `/memory-movie/memories/${image}`;

      img.onload = () => {
        resolve(image); // Resolves with the image name when it loads
      };

      img.onerror = () => {
        reject(false); // Rejects with false if there's an error
      };
    });
  };

  const contextValue = {
    images,
    replacementImages,
    getReplacementImage,
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

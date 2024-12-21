"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState } from "react";

interface ImageGalleryProps {
  images: Array<{ path: string }>;
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
  };

  if (!images.length) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200" />
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
      <Image
        src={`http://backend:8000/static/${images[currentIndex].path}`}
        alt={`${title} - Image ${currentIndex + 1}`}
        width={1280}
        height={720}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Button
          isIconOnly
          onPress={showPrevious}
          isDisabled={currentIndex === 0}
          className="h-12 w-12 rounded-full bg-white/80 text-gray-800 data-[hover=true]:bg-white"
        >
          <BsChevronLeft className="text-2xl" />
        </Button>

        <Button
          isIconOnly
          onPress={showNext}
          isDisabled={currentIndex === images.length - 1}
          className="h-12 w-12 rounded-full bg-white/80 text-gray-800 data-[hover=true]:bg-white"
        >
          <BsChevronRight className="text-2xl" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

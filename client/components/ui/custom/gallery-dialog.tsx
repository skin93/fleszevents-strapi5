"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Gallery } from "@/lib/interfaces";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "strapi-next-image";
import { initializeStrapiImage } from "strapi-next-image";
await initializeStrapiImage(process.env.NEXT_PUBLIC_STRAPI as string);

type Props = {
  gallery: Gallery;
};

export default function GalleryDialog({ gallery }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [columnsCount, setColumnsCount] = useState<number>(3);

  const { photos } = gallery;

  const photosWithIndex = photos.map((photo, originalIndex) => ({
    ...photo,
    originalIndex,
  }));

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null,
    );
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null,
    );
  }, [photos.length]);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumnsCount(1);
      } else if (window.innerWidth < 768) {
        setColumnsCount(2);
      } else {
        setColumnsCount(3);
      }
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <>
      {Array.from({ length: columnsCount }).map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {photosWithIndex
            .filter((photo) => photo.originalIndex % columnsCount === colIndex)
            .map((photo) => {
              const src = getMediaUrl(photo);
              return (
                <div
                  key={photo.originalIndex}
                  className="relative scale-100 hover:scale-105 transition-all duration-300 shadow-md rounded-sm"
                >
                  <Image
                    src={src}
                    alt={photo.alternativeText}
                    blurDataURL={photo.blurDataURL}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1540px) 475px, (min-width: 1280px) 389px, (min-width: 1040px) 304px, (min-width: 780px) 336px, (min-width: 640px) 272px, calc(100vw - 80px)"
                    priority
                    className="rounded-sm object-cover shadow-md cursor-pointer"
                    onClick={() => {
                      console.log(photo.originalIndex);
                      setSelectedIndex(photo.originalIndex);
                    }}
                  />
                </div>
              );
            })}
        </div>
      ))}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent className="border-0 max-w-[2048px] h-[90%] flex flex-col items-center">
          <DialogTitle className="sr-only">{selectedPhoto?.name}</DialogTitle>

          <DialogDescription className="sr-only">
            {selectedPhoto?.alternativeText}
          </DialogDescription>
          {selectedPhoto && (
            <div className="relative w-full h-full flex items-center justify-center group">
              <button
                onClick={handlePrev}
                aria-label="Poprzednie zdjęcie"
                className="absolute left-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors focus:outline-none cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Następne zdjęcie"
                className="absolute right-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors focus:outline-none cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <Image
                priority
                fill={true}
                src={getMediaUrl(selectedPhoto)}
                alt={selectedPhoto?.alternativeText}
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

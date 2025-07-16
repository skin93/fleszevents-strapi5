/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { KeyboardEvent, useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Gallery } from "@/lib/interfaces";
import { getColumns } from "@/lib/getColumnms";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  gallery: Gallery;
};

export default function ImagesDialog({ gallery }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [direction, setDirection] = useState<number>(0);
  const { photos } = gallery;

  const changePhoto = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= photos!.length) return;
      // setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    },
    [photos]
  );

  // Obsługa klawiszy ← →
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") changePhoto(activeIndex - 1);
      if (e.key === "ArrowRight") changePhoto(activeIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown as any);
    return () => window.removeEventListener("keydown", handleKeyDown as any);
  }, [activeIndex, isOpen, changePhoto]);

  return (
    <>
      {[
        getColumns(photos!, 0, 3),
        getColumns(photos!, 1, 3),
        getColumns(photos!, 2, 3),
      ].map((column, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          {column?.map((photo) => {
            const src = getMediaUrl(photo);
            return (
              <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
                key={photo.documentId}
              >
                <DialogTrigger asChild className="cursor-pointer">
                  <div className="relative translate-y-0  hover:translate-y-2 transition-all duration-300">
                    <Image
                      priority
                      width={photo.width}
                      height={photo.height}
                      src={src}
                      alt={photo.alternativeText}
                      className="rounded-lg object-cover"
                      sizes="(min-width: 1560px) 435px, (min-width: 1280px) calc(15.38vw + 198px), (min-width: 640px) calc(50vw - 40px), (min-width: 460px) calc(100vw - 64px), calc(7.86vw + 341px)"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="border-0 flex flex-col justify-between items-center max-w-screen h-full">
                  <DialogHeader className="hidden">
                    <DialogTitle>{photo.name}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="hidden">
                    {photo.alternativeText}
                  </DialogDescription>

                  <Image
                    priority
                    fill={true}
                    src={getMediaUrl(photos![activeIndex])}
                    alt={photo.alternativeText}
                    className="object-contain max-w-[90vw]"
                  />
                  <div className="flex flex-row justify-between w-full">
                    {/* Strzałka w lewo */}
                    <button
                      onClick={() => changePhoto(activeIndex - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/60 p-2 rounded-full shadow hover:bg-white transition"
                      aria-label="Poprzednie zdjęcie"
                    >
                      <ChevronLeft className="w-6 h-6 text-black" />
                    </button>

                    {/* Strzałka w prawo */}
                    <button
                      onClick={() => changePhoto(activeIndex + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/60 p-2 rounded-full shadow hover:bg-white transition"
                      aria-label="Następne zdjęcie"
                    >
                      <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                  </div>

                  {/* <div className="flex overflow-x-auto gap-3 py-2">
                    {photos!.map((photo, i) => {
                      const src = getMediaUrl(photo);
                      return (
                        <div key={i}>
                          <button
                            key={i}
                            onClick={() => changePhoto(i)}
                            className={`relative h-[80px] w-[120px] shrink-0 rounded overflow-hidden border ${
                              i === activeIndex
                                ? "border-blue-500"
                                : "border-transparent"
                            }`}
                          >
                            <Image
                              src={src}
                              alt={`Miniatura ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div> */}
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      ))}
    </>
  );
}

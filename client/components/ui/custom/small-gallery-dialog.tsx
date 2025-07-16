import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getColumns } from "@/lib/getColumnms";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Media } from "@/lib/interfaces";

type Props = {
  images: Media[];
};

export default function SmallGalleryDialog({ images }: Props) {
  return (
    <>
      {[
        getColumns(images, 0, 3),
        getColumns(images, 1, 3),
        getColumns(images, 2, 3),
      ].map((column, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          {column?.map((photo) => {
            const src = getMediaUrl(photo);
            return (
              <Dialog key={photo.documentId}>
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
                    src={src}
                    alt={photo.alternativeText}
                    className="object-contain w-full"
                  />
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      ))}
    </>
  );
}

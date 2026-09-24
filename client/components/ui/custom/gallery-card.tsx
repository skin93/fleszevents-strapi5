"use client";
import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import { Gallery } from "@/lib/interfaces";
import { getMediaUrl } from "@/lib/getMediaUrl";

import Image from "strapi-next-image";

type Props = {
  gallery: Gallery;
};

export default function GalleryCard({ gallery }: Props) {
  return (
    <Card className="group border-none bg-[var(--color-foreground)]/5 text-[contrast-color(var(--color-foreground))] relative scale-100  hover:scale-105 transition-all duration-300 shadow-md">
      <CardContent className="p-0 rounded-sm flex flex-col items-center justify-end ">
        <Image
          src={getMediaUrl(gallery.cover)}
          alt={gallery.cover.alternativeText}
          blurDataURL={gallery.cover.blurDataURL}
          width={gallery.cover.width}
          height={gallery.cover.height}
          sizes="(min-width: 1280px) 426px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority
          style={{ objectFit: "cover" }}
          className="rounded-sm rounded-b-none aspect-video"
        />
        <CardTitle className="w-full h-[100px] flex flex-col items-center justify-center p-4 text-lg text-center text-foreground dark:no-underline dark:group-hover:text-teal-400 group-hover:underline rounded-b-lg transition-all duration-300">
          {gallery.name}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

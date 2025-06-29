import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import Image from "next/image";
import { Gallery } from "@/lib/interfaces";
import { getMediaUrl } from "@/lib/getMediaUrl";

type Props = {
  gallery: Gallery;
};

export default function GalleryCard({ gallery }: Props) {
  return (
    <Card className="group aspect-video w-full border-none relative shadow-none translate-y-0  hover:translate-y-2 transition-all duration-300">
      <CardContent className="p-5 bg-background/5 dark:bg-foreground/5 rounded-lg flex flex-col items-center justify-end ">
        <Image
          priority
          src={getMediaUrl(gallery.cover)}
          title={gallery.name}
          alt={gallery.cover.alternativeText}
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          style={{ objectFit: "cover" }}
          width={gallery.cover.width}
          height={gallery.cover.height}
          className="rounded-sm aspect-video"
        />
        <CardTitle className="w-full p-4 text-lg text-center text-foreground dark:no-underline dark:group-hover:text-teal-400 group-hover:underline rounded-b-lg transition-all duration-300">
          {gallery.name}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

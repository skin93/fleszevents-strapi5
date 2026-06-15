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
    <Card className="group border-none bg-[var(--color-foreground)]/5 text-[contrast-color(var(--color-foreground))] relative scale-100  hover:scale-105 transition-all duration-300 shadow-md">
      <CardContent className="p-0 rounded-sm flex flex-col items-center justify-end ">
        <Image
          loading={"eager"}
          unoptimized
          src={getMediaUrl(gallery.cover)}
          title={gallery.name}
          alt={gallery.cover.alternativeText}
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          style={{ objectFit: "cover" }}
          width={gallery.cover.width}
          height={gallery.cover.height}
          className="rounded-sm rounded-b-none aspect-[16/9]"
        />
        <CardTitle className="w-full h-[100px] flex flex-col items-center justify-center p-4 text-lg text-center text-foreground dark:no-underline dark:group-hover:text-teal-400 group-hover:underline rounded-b-lg transition-all duration-300">
          {gallery.name}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

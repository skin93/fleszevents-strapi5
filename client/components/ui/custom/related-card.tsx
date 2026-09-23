"use client";
import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import { Article } from "@/lib/interfaces";
import { getMediaUrl } from "@/lib/getMediaUrl";

import Image from "strapi-next-image";
import { initializeStrapiImage } from "strapi-next-image";
await initializeStrapiImage(process.env.NEXT_PUBLIC_STRAPI as string);

type Props = {
  article: Article;
};

export default function RelatedCard({ article }: Props) {
  return (
    <Card className="group border border-white/10 bg-[var(--color-foreground)]/5 text-[contrast-color(var(--color-foreground))] backdrop-blur-md rounded-sm shadow-md relative scale-100  hover:scale-105 transition-all duration-300 max-w-full">
      <CardContent className="p-4 rounded-sm flex flex-row items-center">
        <Image
          src={getMediaUrl(article.cover)}
          alt={article.cover.alternativeText}
          blurDataURL={article.cover.blurDataURL}
          width={article.cover.width}
          height={article.cover.height}
          sizes="(min-width: 780px) 128px, 80px"
          priority
          style={{ objectFit: "cover" }}
          className="rounded-sm aspect-video w-[5em] md:w-[8em] p-0"
        />
        <CardTitle className="text-xs text-left ml-4 sm:text-sm md:text-md text-foreground dark:no-underline dark:group-hover:text-teal-400 group-hover:underline rounded-b-lg transition-all duration-300 p-0 w-full">
          {article.title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

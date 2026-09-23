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

export default function BaseCard({ article }: Props) {
  return (
    <Card className="group border border-white/10 bg-[var(--color-foreground)]/5 text-[contrast-color(var(--color-foreground))] backdrop-blur-md rounded-sm shadow-md relative scale-100  hover:scale-105 transition-all duration-300">
      <CardContent className="p-4 rounded-lg flex flex-col items-center justify-end ">
        <Image
          src={getMediaUrl(article.cover)}
          alt={article.cover.alternativeText}
          blurDataURL={article.cover.blurDataURL}
          width={article.cover.width}
          height={article.cover.height}
          sizes="(min-width: 1560px) 435px, (min-width: 1280px) calc(15.38vw + 198px), (min-width: 640px) calc(50vw - 40px), (min-width: 460px) calc(100vw - 64px), calc(7.86vw + 341px)"
          priority
          style={{ objectFit: "cover" }}
          className="rounded-sm aspect-[16/9]"
        />
        <CardTitle className="w-full h-[100px] flex flex-col items-center justify-center p-4 text-sm md:text-md xl:text-lg text-center text-[contrast-color(var(--color-background))] dark:no-underline dark:group-hover:text-teal-400 group-hover:underline rounded-b-lg transition-all duration-300">
          {article.title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

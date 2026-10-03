"use client";
import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import { Article } from "@/lib/interfaces";

import Image from "strapi-next-image";

type Props = {
  article: Article;
};

export default function RelatedCard({ article }: Props) {
  return (
    <Card
      className="group relative scale-100  hover:scale-105 transition-all duration-300 max-w-full border 
      border-black/10 bg-white/85
      
      dark:border-white/5 dark:bg-[var(--color-foreground)]/5 text-[contrast-color(var(--color-foreground))] backdrop-blur-md rounded-sm shadow-md"
    >
      <CardContent className="p-0 rounded-sm flex flex-row items-center">
        <Image
          src={article.cover}
          alt={article.cover.alternativeText}
          sizes="(min-width: 780px) 128px, 80px"
          priority
          style={{ objectFit: "cover" }}
          className="rounded-sm aspect-[3/2] w-[5em] md:w-[15em] p-0"
        />
        <CardTitle className="text-xs sm:text-sm text-left ml-4 text-foreground dark:no-underline dark:group-hover:text-teal-400 group-hover:underline rounded-b-lg transition-all duration-300 p-0 w-full">
          {article.title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

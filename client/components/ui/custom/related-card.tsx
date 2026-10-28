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
    <Card className="group relative scale-100  hover:scale-105 transition-all duration-300 max-w-full custom-backdrop shadow-md">
      <CardContent className="p-0 rounded-sm flex flex-row items-center">
        <Image
          src={article.cover}
          alt={article.cover.alternativeText}
          sizes="(min-width: 780px) 170px, 80px"
          priority
          style={{ objectFit: "cover" }}
          className="rounded-sm aspect-[1/1] w-[5em] p-0 rounded-tr-none rounded-br-none"
        />
        <CardTitle className="text-base text-left p-2 text-foreground dark:no-underline rounded-b-lg transition-all duration-300 w-full font-[700]">
          {article.title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

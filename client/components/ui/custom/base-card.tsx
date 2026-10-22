"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../card";
import { Article } from "@/lib/interfaces";

import Image from "strapi-next-image";

type Props = {
  article: Article;
};

export default function BaseCard({ article }: Props) {
  return (
    <Card className="group relative overflow-hidden flex flex-col w-full h-full scale-100 hover:scale-105 transition-all duration-300 custom-backdrop">
      <Image
        src={article.cover}
        alt={article.cover.alternativeText}
        sizes="(min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 267px, calc(99.69vw - 78px)"
        priority
        className="w-full object-cover aspect-[3/2]"
      />
      <CardHeader className="p-6 m-0 relative">
        <CardTitle className="text-left text-wrap text-foreground text-xl font-(family-name:--font-kalam)">
          {article.title}
        </CardTitle>
        <CardDescription className="text-left text-wrap">
          {article.excerpt}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

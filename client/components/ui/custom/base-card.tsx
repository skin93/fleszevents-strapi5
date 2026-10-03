"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "../card";
import { Article } from "@/lib/interfaces";

import Image from "strapi-next-image";

type Props = {
  article: Article;
};

export default function BaseCard({ article }: Props) {
  return (
    <Card className="group relative overflow-hidden border-none text-white flex flex-col justify-end max-w-full aspect-[3/2]">
      <Image
        src={article.cover}
        alt={article.cover.alternativeText}
        sizes="(min-width: 1536px) 512px, (min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 267px, calc(99.69vw - 78px)"
        priority
        className="absolute inset-0 h-full w-full object-cover "
      />
      <div className=" absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      <CardHeader className="pb-1 sm:pb-4 relative z-10">
        <CardTitle className=" text-white text-sm sm:text-lg text-center group-hover:text-teal-400 transition-all duration-300">
          {article.title}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

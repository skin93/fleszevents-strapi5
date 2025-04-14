import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import Image from "next/image";
// import { getMediaUrl } from "@/lib/getMediaUrl";
import { Article } from "@/lib/interfaces";

type Props = {
  article: Article;
};

export default function BaseCard({ article }: Props) {
  const domain = process.env.NEXT_PUBLIC_STRAPI;
  return (
    <Card className="group aspect-video w-full border-none relative">
      <Image
        loading="lazy"
        width={article.cover?.width}
        height={article.cover?.height}
        src={`${domain}${article.cover?.url}`}
        title={article.title}
        style={{ objectFit: "cover" }}
        alt={article.cover.alternativeText}
        className="rounded-lg aspect-video w-full"
      />
      <CardContent className="absolute p-0 inset-0 bg-foreground/80 group-hover:bg-foreground/20 dark:bg-background/80 dark:group-hover:bg-background/20 rounded-lg flex flex-col items-center justify-end transition-all duration-300">
        <CardTitle className="w-full p-4 text-lg text-center text-[#fff]! dark:group-hover:text-teal-400! dark:group-hover:bg-background/90 group-hover:bg-foreground/90 rounded-bl-lg rounded-br-lg transition-all duration-300">
          {article.title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

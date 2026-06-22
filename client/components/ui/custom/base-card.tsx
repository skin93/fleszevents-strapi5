import React from "react";
import { Card, CardContent, CardTitle } from "../card";
import Image from "next/image";
import { Article } from "@/lib/interfaces";
import { getMediaUrl } from "@/lib/getMediaUrl";

type Props = {
  article: Article;
};

export default function BaseCard({ article }: Props) {
  return (
    <Card className="group border border-white/10 bg-[var(--color-foreground)]/5 text-[contrast-color(var(--color-foreground))] backdrop-blur-md rounded-sm shadow-md relative scale-100  hover:scale-105 transition-all duration-300">
      <CardContent className="p-4 rounded-lg flex flex-col items-center justify-end ">
        <Image
          loading={"eager"}
          unoptimized
          src={getMediaUrl(article.cover)}
          title={article.title}
          alt={article.cover.alternativeText}
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          style={{ objectFit: "cover" }}
          width={article.cover.width}
          height={article.cover.height}
          className="rounded-sm aspect-[16/9]"
        />
        <CardTitle className="w-full h-[100px] flex flex-col items-center justify-center p-4 text-sm md:text-md xl:text-lg text-center text-[contrast-color(var(--color-background))] dark:no-underline dark:group-hover:text-teal-400 group-hover:underline rounded-b-lg transition-all duration-300">
          {article.title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

"use client";
import React, { useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import RelatedArticles from "@/components/ui/custom/related-articles";
import { Separator } from "@/components/ui/separator";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { formatDateToLocal } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/interfaces";

type Props = {
  article: Article;
};

export default function SlugPageComponent({ article }: Props) {
  useEffect(() => {
    const figures = document.querySelectorAll(".image");
    figures?.forEach((figure) => {
      const image = figure.querySelector("img");
      const imageSrc = image?.getAttribute("src");
      const newImageSrc = `${process.env.NEXT_PUBLIC_STRAPI}${imageSrc}`;
      image?.setAttribute("src", newImageSrc);
    });
  }, []);
  return (
    <main>
      <section className="my-6" aria-label="slug-page">
        <div className="mb-4">
          {article.categories?.map((category) => (
            <Link
              key={category.documentId}
              href={`/categories/${category.slug}`}
            >
              <Badge
                className="bg-foreground hover:bg-foreground/70 dark:bg-accent/70 dark:hover:bg-accent/90 dark:text-foreground mr-2 p-2 rounded-sm uppercase"
                variant="default"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
          {article.authors?.map((author) => (
            <Badge
              key={author.documentId}
              className=" mr-2 p-2 uppercase border-none"
              variant="outline"
            >
              {author.name}
            </Badge>
          ))}
          {article.publishedAt === undefined ? (
            <Badge variant="outline" className=" mr-2 p-2 border-none ">
              {formatDateToLocal(article.createdAt!.toLocaleString())}
            </Badge>
          ) : (
            <Badge variant="outline" className=" mr-2 p-2 border-none">
              {formatDateToLocal(article.publishedAt?.toString())}
            </Badge>
          )}
        </div>
        <h1 aria-label="article-title">{article.title}</h1>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 xl:grid-cols-[50%_40%] gap-2 justify-between">
          <article aria-label="left-column">
            <AspectRatio
              ratio={16 / 9}
              className="realtive"
              aria-label="image-wrapper"
            >
              <Image
                src={getMediaUrl(article.cover)}
                priority
                alt={article.title}
                aria-label="article-cover"
                style={{ objectFit: "cover" }}
                className="rounded-sm aspect-video"
                fill
              />
              <div className="absolute bottom-0 left-0 w-auto h-auto bg-[rgba(0,0,0,0.7)] rounded-bl-sm">
                <p
                  aria-label="article-image-caption"
                  className="font-bold text-[#fff]! my-0 px-4"
                >
                  {article.cover.caption}
                </p>
              </div>
            </AspectRatio>
            <Separator className="my-6" />
            <div
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}
              aria-label="article-content"
              className="embeded-iframe"
            />
            <Separator />
            <p className="mb-0 text-foreground font-bold"> Tagi:</p>
            <div className="inline-table my-6">
              {article.tags?.map((tag) => (
                <Link key={tag.documentId} href={`/tags/${tag.slug}`}>
                  <Badge
                    className="uppercase ml-0 mr-6 p-0
                    border-none hover:underline dark:text-foreground"
                    variant="outline"
                  >
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </article>
          <aside
            className="container justify-center p-0"
            aria-label="right-column"
          >
            {article.relatedArticles && (
              <RelatedArticles articles={article.relatedArticles.articles} />
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

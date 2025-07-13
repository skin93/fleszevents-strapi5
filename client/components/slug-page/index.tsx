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
import { Article, Media } from "@/lib/interfaces";
import { getColumns } from "@/lib/getColumnms";

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
            {article.gallery && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    getColumns(article.gallery.images as Media[], 0, 3),
                    getColumns(article.gallery.images as Media[], 1, 3),
                    getColumns(article.gallery.images as Media[], 2, 3),
                  ].map((column, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                      {column?.map((photo) => {
                        const src = getMediaUrl(photo);
                        return (
                          // <Dialog key={photo.documentId}>
                          //   <DialogTrigger asChild className="cursor-pointer">
                          //     <div className="relative translate-y-0  hover:translate-y-2 transition-all duration-300">
                          //       <Image
                          //         priority
                          //         width={photo.width}
                          //         height={photo.height}
                          //         src={src}
                          //         alt={photo.alternativeText}
                          //         className="rounded-lg object-cover relative"
                          //         sizes="(min-width: 1560px) 435px, (min-width: 1280px) calc(15.38vw + 198px), (min-width: 640px) calc(50vw - 40px), (min-width: 460px) calc(100vw - 64px), calc(7.86vw + 341px)"
                          //       />
                          //     </div>
                          //   </DialogTrigger>
                          //   <DialogContent className="border-0 max-w-[70vw] h-auto p-0 ">
                          //     <DialogHeader className="hidden">
                          //       <DialogTitle>{photo.name}</DialogTitle>
                          //     </DialogHeader>
                          //     <Image
                          //       priority
                          //       width={photo.width}
                          //       height={photo.height}
                          //       src={src}
                          //       alt={photo.alternativeText}
                          //       className="rounded-lg object-contain "
                          //     />
                          //   </DialogContent>
                          // </Dialog>
                          <div key={photo.documentId}>
                            <div className="relative translate-y-0  hover:translate-y-2 transition-all duration-300 cursor-pointer">
                              <Link href={src} target="_blank">
                                <Image
                                  priority
                                  width={photo.width}
                                  height={photo.height}
                                  src={src}
                                  alt={photo.alternativeText}
                                  className="rounded-lg object-cover relative"
                                  sizes="(min-width: 1560px) 435px, (min-width: 1280px) calc(15.38vw + 198px), (min-width: 640px) calc(50vw - 40px), (min-width: 460px) calc(100vw - 64px), calc(7.86vw + 341px)"
                                />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </>
            )}
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

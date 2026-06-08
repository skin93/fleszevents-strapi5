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
import SmallGalleryDialog from "../ui/custom/small-gallery-dialog";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

type Props = {
  article: Article;
  categorySlug: string;
};

export default function SlugPageComponent({ article, categorySlug }: Props) {
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
      <section className="my-6" aria-label="article-page">
        <div className="my-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">
                    <Home />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${categorySlug}`}>
                    {categorySlug.toUpperCase()}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mb-4">
          {article.categories?.map((category) => (
            <Link key={category.documentId} href={`/${category.slug}`}>
              <Badge
                className="bg-foreground hover:bg-foreground/70 dark:bg-accent/70 dark:hover:bg-accent/90 dark:text-foreground mr-2 p-2 rounded-sm uppercase"
                variant="default"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
          {article.isFestival && article.festival?.slug && (
            <Link href={`/festiwalowa-mapa?festival=${article.festival?.name}`}>
              <Badge
                className="bg-foreground hover:bg-foreground/70 dark:bg-accent/70 dark:hover:bg-accent/90 dark:text-foreground mr-2 p-2 rounded-sm uppercase"
                variant="default"
              >
                Pokaż na mapie
              </Badge>
            </Link>
          )}
          {article.authors?.map((author) => (
            <Badge
              key={author.documentId}
              className=" mr-2 p-2 uppercase border-none"
              variant="outline"
            >
              {author.name}
            </Badge>
          ))}
          <Badge variant="outline" className=" mr-2 p-2 border-none ">
            {formatDateToLocal(article.createdAt!.toLocaleString())}
          </Badge>
        </div>
        <h1 aria-label="article-title">{article.title}</h1>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 xl:grid-cols-[50%_40%] gap-2 justify-between">
          <article aria-label="left-column">
            <AspectRatio
              ratio={16 / 9}
              className="relative"
              aria-label="image-wrapper"
            >
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
                  <SmallGalleryDialog images={article.gallery.images} />
                </div>
              </>
            )}
            <Separator className="my-6" />
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

import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { getGalleryBySlug, getGalleryMeta } from "@/lib/data/galleries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const { seo } = await getGalleryMeta(params.slug);

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    robots: {
      index: seo?.robotsIndex,
      follow: seo?.robotsFollow,
      googleBot: {
        index: seo?.googleIndex,
        follow: seo?.googleFollow,
      },
    },
    alternates: {
      canonical: seo?.canonicalURL,
    },
    openGraph: {
      url: seo?.canonicalURL,
      title: seo?.openGraph?.ogTitle,
      description: seo?.openGraph?.ogDescription,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/${seo?.openGraph?.ogImage?.url}`,
          width: seo?.openGraph?.ogImage?.width,
          height: seo?.openGraph?.ogImage?.height,
          alt: seo?.openGraph?.ogImage?.alternativeText,
        },
      ],
    },
  };
}

export default async function GalleryPage({ params }: Props) {
  const { gallery } = await getGalleryBySlug(params.slug);

  if (!gallery.photos || gallery.photos.length === 0) {
    notFound();
  }

  return (
    <main>
      <section
        aria-label={`${gallery.name}`}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="my-8 text-center text-4xl font-bold uppercase">
          {gallery.name}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {gallery.photos.map((photo) => {
            const src = getMediaUrl(photo);
            return (
              <Dialog key={photo.documentId}>
                <DialogTrigger asChild className="cursor-pointer">
                  <div className="relative">
                    <Image
                      priority
                      width={photo.width}
                      height={photo.height}
                      src={src}
                      alt={photo.alternativeText}
                      className="rounded-lg object-cover relative"
                      sizes="(min-width: 1560px) 435px, (min-width: 1280px) calc(15.38vw + 198px), (min-width: 640px) calc(50vw - 40px), (min-width: 460px) calc(100vw - 64px), calc(7.86vw + 341px)"
                    />
                    <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] rounded-lg hover:bg-[rgba(0,0,0,0.1)] transition-all" />
                  </div>
                </DialogTrigger>
                <DialogContent className="overflow-y-hidden border-0 max-w-[90rem] h-auto p-0">
                  <DialogHeader className="hidden">
                    <DialogTitle>{photo.name}</DialogTitle>
                  </DialogHeader>
                  <Image
                    priority
                    width={photo.width}
                    height={photo.height}
                    src={src}
                    alt={photo.alternativeText}
                    className="rounded-lg object-cover"
                  />
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </section>
    </main>
  );
}

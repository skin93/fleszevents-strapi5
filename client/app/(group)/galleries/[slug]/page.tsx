import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";
import { getGalleryBySlug, getGalleryMeta } from "@/lib/data/galleries";

import GalleryDialog from "@/components/ui/custom/gallery-dialog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { seo } = await getGalleryMeta(slug);

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
          url: `${process.env.NEXT_PUBLIC_STRAPI}${seo?.openGraph?.ogImage?.url}`,
          width: seo?.openGraph?.ogImage?.width,
          height: seo?.openGraph?.ogImage?.height,
          alt: seo?.openGraph?.ogImage?.alternativeText,
        },
      ],
    },
  };
}

export default async function GallerySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { gallery } = await getGalleryBySlug(slug);

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
        <div className="grid grid-cols-3 gap-4">
          <GalleryDialog gallery={gallery} />
        </div>
      </section>
    </main>
  );
}

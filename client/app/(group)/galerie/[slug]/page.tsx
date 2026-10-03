import { notFound } from "next/navigation";
import React, { Fragment } from "react";
import { Metadata } from "next";
import { getGalleryBySlug, getGalleryMeta } from "@/lib/data/galleries";

import GalleryDialog from "@/components/ui/custom/gallery-dialog";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home } from "lucide-react";

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
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gallery.seo?.structuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <main>
        <div className="mt-6">
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
                  <Link href="/galleries">GALERIE</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{gallery.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <section
          aria-label={`${gallery.name}`}
          className="mt-6 p-6 border 
      border-black/10 bg-white/85
      
      dark:border-white/5 dark:bg-[var(--color-foreground)]/5 backdrop-blur-md rounded-sm shadow-md"
        >
          <div className="flex flex-col">
            <h1 className="mt-0 mb-6 text-4xl uppercase">{gallery.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <GalleryDialog gallery={gallery} />
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

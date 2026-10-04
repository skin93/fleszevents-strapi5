import { Metadata } from "next";
import { getGalleriesByTerm } from "@/lib/data/galleries";
import CustomPagination from "@/components/ui/custom/pagination";
import { notFound } from "next/navigation";
import Link from "next/link";
import GalleryCard from "@/components/ui/custom/gallery-card";
import { CollectionPage, WithContext } from "schema-dts";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import GalleryFilters from "@/components/gallery/gallery-filters";
import Section from "@/components/ui/custom/section";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Obszerne fotorelacje i galerie zdjęć z koncertów oraz festiwali rockowych i metalowych!",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/galleries",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: process.env.NEXT_PUBLIC_APP_DOMAIN,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Fotorelacje z koncertów i festiwali!",
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
        width: 1280,
        height: 630,
        alt: "Flesz.Events logo",
      },
    ],
  },
};

type Props = {
  searchParams: Promise<{ page: string; term: string }>;
};

export default async function GalleriesPage({ searchParams }: Props) {
  const jsonLd: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fleszevents.pl/galleries",
    },
    name: "Galerie zdjęć - FleszEvents",
    description:
      "Obszerne fotorelacje i galerie zdjęć z koncertów oraz festiwali rockowych i metalowych!",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "FleszEvents",
          item: "https://fleszevents.pl/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Galerie",
          item: "https://fleszevents.pl/galerie",
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "FleszEvents",
      logo: {
        "@type": "ImageObject",
        url: "https://fleszevents.pl/FE_1_baner.svg",
      },
    },
    about: {
      "@type": "ImageGallery",
      description:
        "Zbiór fotografii dokumentujących polską scenę rockową i metalową!.",
    },
  };

  const { page, term = "" } = await searchParams;
  const currentPage = Number(page) || 1;
  const { galleries, pageInfo } = await getGalleriesByTerm(
    term,
    currentPage,
    12,
  );

  if (!galleries || galleries.length == 0) {
    notFound();
  }

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
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
                <BreadcrumbPage>GALERIE</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <GalleryFilters />
        <Section ariaLabel="Galerie">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
            {galleries.map((gallery) => (
              <div key={gallery.documentId}>
                <Link href={`/galerie/${gallery.slug}`}>
                  <GalleryCard gallery={gallery} />
                </Link>
              </div>
            ))}
          </div>
          <CustomPagination
            currentPage={currentPage}
            pageCount={pageInfo.pageCount}
          />
        </Section>
      </main>
    </Fragment>
  );
}

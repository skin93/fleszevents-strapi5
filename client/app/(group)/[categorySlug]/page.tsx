import BaseCard from "@/components/ui/custom/base-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Fragment } from "react";
import CustomPagination from "@/components/ui/custom/pagination";
import {
  getArticlesByCategory,
  getCategory,
  getCategoryMetaQuery,
} from "@/lib/data/categories";
import { Metadata } from "next";
import { CollectionPage, WithContext } from "schema-dts";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Home } from "lucide-react";
import Section from "@/components/ui/custom/section";

type Props = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ page: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ page: string }>;
}): Promise<Metadata> {
  // read route params
  const { categorySlug } = await params;

  // fetch data
  const { seo } = await getCategoryMetaQuery(categorySlug);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    robots: {
      index: seo.robotsIndex,
      follow: seo.robotsFollow,
      googleBot: {
        index: seo.googleIndex,
        follow: seo.googleFollow,
      },
    },
    alternates: {
      canonical: seo.canonicalURL,
    },
    openGraph: {
      type: "website",
      url: seo.openGraph?.ogUrl,
      title: seo.openGraph?.ogTitle,
      description: seo.openGraph?.ogDescription,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI}/${seo.openGraph?.ogImage?.url}`,
          width: seo.openGraph?.ogImage?.width,
          height: seo.openGraph?.ogImage?.height,
          alt: seo.openGraph?.ogImage?.alternativeText,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { category } = await getCategory(categorySlug);
  const { articles, pageInfo } = await getArticlesByCategory(
    categorySlug,
    currentPage,
    12,
  );

  if (!articles || articles.length == 0) {
    notFound();
  }

  const jsonLd: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://fleszevents.pl/${categorySlug}`,
    },
    name: `${category.name} - FleszEvents`,
    description: `${category.description}`,
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
          name: "Koncerty",
          item: `https://fleszevents.pl/${categorySlug}`,
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
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-foreground/5">
        <Section ariaLabel={`${categorySlug} content`}>
          <div className="mb-6">
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
                  <BreadcrumbPage>{categorySlug.toUpperCase()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {articles.map((article) => (
              <div key={article.documentId}>
                <Link href={`/${categorySlug}/${article.slug}`}>
                  <BaseCard article={article} />
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

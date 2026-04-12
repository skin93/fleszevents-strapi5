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

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page: string }>;
}): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  // fetch data
  const { seo } = await getCategoryMetaQuery(slug);

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
      canonical: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/categories/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/categories/${slug}`,
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
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { category } = await getCategory(slug);
  const { articles, pageInfo } = await getArticlesByCategory(
    slug,
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
      "@id": `https://fleszevents.pl/categories/${category.slug}`,
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
          item: `https://fleszevents.pl/categories/${category.slug}`,
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
      <main>
        <section
          aria-label={`${slug} content`}
          className="flex flex-col justify-center items-center"
        >
          <h1 className="my-8 text-center uppercase">{slug.toUpperCase()}</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <div key={article.documentId}>
                <Link href={`/articles/${article.slug}`}>
                  <BaseCard article={article} />
                </Link>
              </div>
            ))}
          </div>
          <div className="m-8" />
          <CustomPagination
            currentPage={currentPage}
            pageCount={pageInfo.pageCount}
          />
        </section>
      </main>
    </Fragment>
  );
}

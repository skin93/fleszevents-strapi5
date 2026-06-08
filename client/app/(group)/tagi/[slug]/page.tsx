import BaseCard from "@/components/ui/custom/base-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Fragment } from "react";
import CustomPagination from "@/components/ui/custom/pagination";
import { getArticlesByTag, getTag } from "@/lib/data/tags";
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
  const { tag } = await getTag(slug);

  return {
    title: tag.name,
    robots: {
      index: false,
      googleBot: {
        index: false,
      },
    },
    alternates: {
      canonical: `/tags/${tag.slug}`,
    },
    openGraph: null,
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { articles, pageInfo } = await getArticlesByTag(slug, currentPage, 12);
  const { tag } = await getTag(slug);

  if (!articles || articles.length == 0) {
    notFound();
  }

  const jsonLd: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fleszevents.pl/tags/4dziki",
    },
    name: `${tag.name} - wiadomości, koncerty, relacje | FleszEvents`,
    description: `Wszystkie informacje na temat ${tag.name} w jednym miejscu. Artykuły, zapowiedzi koncertów, fotorelacje oraz aktualności powiązane z tagiem ${tag.name} w serwisie FleszEvents.`,
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
          name: "Tagi",
          item: "https://fleszevents.pl/tagi",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${tag.name}`,
          item: `https://fleszevents.pl/tagi/${tag.slug}`,
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
        <section aria-label={`${slug} content`}>
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
                    <Link href="/tagi">TAGI</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{tag.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="my-8 text-center uppercase">
              {tag.name.toUpperCase()}
            </h1>
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
          </div>
        </section>
      </main>
    </Fragment>
  );
}

import BaseCard from "@/components/ui/custom/base-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import CustomPagination from "@/components/ui/custom/pagination";
import { getArticlesByTag, getTagMeta } from "@/lib/data/tags";
import { Metadata } from "next";

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
  const { seo } = await getTagMeta(slug);

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

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { articles, pageInfo } = await getArticlesByTag(slug, currentPage, 12);

  if (!articles || articles.length == 0) {
    notFound();
  }

  return (
    <main>
      <section
        aria-label={`${slug} content`}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="my-8 text-center font-bold uppercase">
          {slug.toUpperCase()}
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
      </section>
    </main>
  );
}

import BaseCard from "@/components/ui/custom/base-card";
import { getArticlesByTerm } from "@/lib/data/articles";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  searchParams: Promise<{ q: string }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return {
    title: "Szukaj",
    description: `Wyniki wyszukiwań na podstawie frazy ${q}`,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/search?q=${q}`,
    },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const term = q || "";
  const { articles } = await getArticlesByTerm(term);

  if (!articles) {
    notFound();
  }

  return (
    <main>
      <section
        aria-label="Search articles"
        className="flex flex-col justify-center items-center"
      >
        <h1 className="my-8 text-center font-bold uppercase">
          Wyniki dla frazy <q>{term}</q>
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
        <div className="my-4" />
      </section>
    </main>
  );
}

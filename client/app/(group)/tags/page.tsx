import { notFound } from "next/navigation";
import React from "react";
import { ButtonLink } from "@/components/ui/custom/button-link";
import CustomPagination from "@/components/ui/custom/pagination";
import { getAllTags } from "@/lib/data/tags";

export async function generateMetadata() {
  return {
    title: "Tagi",
    description: "Zbiór wszystki tagów zawartych na stronie",
    robots: {
      index: false,
      googleBot: {
        index: false,
      },
    },
    alternates: {
      canonical: "/tags",
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tags`,
      title: "Tagi",
      description: "Zbiór wszystki tagów zawartych na stronie",
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
}

type Props = {
  searchParams: Promise<{ page: string }>;
};

export default async function TagsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { tags, pageInfo } = await getAllTags(currentPage, 40);

  if (!tags || tags.length === 0) {
    notFound();
  }

  return (
    <main>
      <section aria-label="Tags">
        <h1 className="my-8 text-center uppercase">TAGI</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          {tags.map((tag) => (
            <ButtonLink key={tag.documentId} href={`/tags/${tag.slug}`}>
              #{tag.name}
            </ButtonLink>
          ))}
        </div>
        <div className="my-8" />
        <CustomPagination
          currentPage={currentPage}
          pageCount={pageInfo.pageCount}
        />
      </section>
    </main>
  );
}

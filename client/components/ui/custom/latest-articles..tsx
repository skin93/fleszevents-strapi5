import Link from "next/link";
import React from "react";
import { Article } from "@/lib/interfaces";
import RelatedCard from "./related-card";

type Props = {
  articles?: Article[] | null;
};

export default function LatestArticles({ articles }: Props) {
  return (
    <div
      className="w-full flex-col justify-between items-start xl:sticky xl:top-[100px] p-6 "
      aria-label="related-articles"
    >
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-0 mb-6 uppercase">
        Ostatnie wpisy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 justify-center gap-6">
        {articles?.map((article) => (
          <div key={article.documentId}>
            <Link href={`/${article.categories[0].slug}/${article.slug}`}>
              <RelatedCard article={article} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

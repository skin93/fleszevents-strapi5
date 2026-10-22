import Link from "next/link";
import BaseCard from "@/components//ui/custom/base-card";
import { Article } from "@/lib/interfaces";
import Section from "../ui/custom/section";

type Props = {
  articles: Article[];
  name: string;
  categorySlug: string;
};

export default function CategoryBlock({ articles, name, categorySlug }: Props) {
  return (
    <Section ariaLabel={`Latest ${name}`}>
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-0 mb-6 uppercase">
        {categorySlug.toUpperCase()}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <div key={article.documentId}>
            <Link href={`/${categorySlug}/${article.slug}`}>
              <BaseCard article={article} />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}

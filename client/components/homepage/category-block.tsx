import Link from "next/link";
import BaseCard from "@/components//ui/custom/base-card";
import { ReadMoreLink } from "@/components//ui/custom/button-link";
import { Article } from "@/lib/interfaces";

type Props = {
  articles: Article[];
  name: string;
  slug: string;
};

export default function CategoryBlock({ articles, name, slug }: Props) {
  return (
    <section
      aria-label={`Latest ${name}`}
      className="flex flex-col justify-center items-center"
    >
      <h1 className="my-8 text-center font-bold">{slug.toUpperCase()}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {articles?.map((article) => (
          <div key={article.documentId}>
            <Link href={`/articles/${article.slug}`}>
              <BaseCard article={article} />
            </Link>
          </div>
        ))}
      </div>
      <ReadMoreLink href={`/categories/${slug}`} />
    </section>
  );
}

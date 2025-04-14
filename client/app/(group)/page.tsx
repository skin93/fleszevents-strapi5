import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import Promo from "@/components/homepage/promo";
import CategoryBlock from "@/components/homepage/category-block";
import { getLatestArticles } from "@/lib/data/articles";

export const revalidate = 3600;

export default async function HomePage() {
  const { concerts, festivals, premiers, news, promos } =
    await getLatestArticles(0, 6);

  if (!concerts || !festivals || !premiers || !news || !promos) {
    notFound();
  }

  return (
    <main>
      <Promo promos={promos.articles} />
      <Separator />
      <CategoryBlock
        articles={concerts.articles}
        name="concerts"
        slug={concerts.slug}
      />
      <Separator />
      <CategoryBlock
        articles={festivals.articles}
        name="festivals"
        slug={festivals.slug}
      />
      <Separator />
      <CategoryBlock articles={news.articles} name="news" slug={news.slug} />
      <Separator />
      <CategoryBlock
        articles={premiers.articles}
        name="premiers"
        slug={premiers.slug}
      />
    </main>
  );
}

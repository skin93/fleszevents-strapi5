import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import Promo from "@/components/homepage/promo";
import CategoryBlock from "@/components/homepage/category-block";
import { getLatestArticles } from "@/lib/data/articles";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { concerts, festivals, premiers, news, promos } =
    await getLatestArticles(0, 6);

  if (!concerts || !festivals || !premiers || !news || !promos) {
    notFound();
  }

  return (
    <main>
      <Promo promos={promos} />
      <Separator />
      <CategoryBlock articles={festivals} name="festivals" slug="festiwale" />
      <Separator />
      <CategoryBlock articles={concerts} name="concerts" slug="koncerty" />
      <Separator />
      <CategoryBlock articles={news} name="news" slug="newsy" />
      <Separator />
      <CategoryBlock articles={premiers} name="premiers" slug="premiery" />
    </main>
  );
}

import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import Promo from "@/components/homepage/promo";
import CategoryBlock from "@/components/homepage/category-block";
import { getLatestArticles, getPromoArticles } from "@/lib/data/articles";
import { WebSite, WithContext } from "schema-dts";
import { Fragment } from "react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const jsonLd: WithContext<WebSite> = {
    url: "https://fleszevents.pl/",
    name: "FleszEvents",
    "@type": "WebSite",
    hasPart: [
      {
        url: "https://fleszevents.pl/calendar",
        name: "Kalendarz",
        "@type": "WebPage",
        description:
          "Harmonogram nadchodzących koncertów i festiwali muzycznych.",
      },
      {
        url: "https://fleszevents.pl/festival-map",
        name: "Festiwalowa Mapa",
        "@type": "WebPage",
        description:
          "Interaktywna mapa festiwali rockowych i metalowych w Polsce.",
      },
      {
        url: "https://fleszevents.pl/contact",
        name: "Kontakt",
        "@type": "ContactPage",
        description: "Dane kontaktowe redakcji FleszEvents.",
      },
      {
        url: "https://fleszevents.pl/festivals",
        name: "Festiwale",
        "@type": "CollectionPage",
        description: "Najnowsze informacje, daty i line-upy festiwali.",
      },
      {
        url: "https://fleszevents.pl/concerts",
        name: "Koncerty",
        "@type": "CollectionPage",
        description: "Zapowiedzi koncertów klubowych i tras koncertowych.",
      },
      {
        url: "https://fleszevents.pl/news",
        name: "Newsy",
        "@type": "CollectionPage",
        description: "Aktualności ze świata muzyki alternatywnej i ciężkiej.",
      },
      {
        url: "https://fleszevents.pl/premieres",
        name: "Premiery",
        "@type": "CollectionPage",
        description: "Nowe single, teledyski oraz zapowiedzi albumów.",
      },
      {
        url: "https://fleszevents.pl/reports",
        name: "Relacje",
        "@type": "CollectionPage",
        description: "Artykuły i fotorelacje z odbytych wydarzeń muzycznych.",
      },
      {
        url: "https://fleszevents.pl/interviews",
        name: "Wywiady",
        "@type": "CollectionPage",
        description: "Rozmowy z artystami i promotorami sceny muzycznej.",
      },
      {
        url: "https://fleszevents.pl/patronage",
        name: "Patronat",
        "@type": "CollectionPage",
        description: "Wydarzenia objęte patronatem medialnym FleszEvents.",
      },
      {
        url: "https://fleszevents.pl/galleries",
        name: "Galerie",
        "@type": "CollectionPage",
        description: "Obszerne galerie zdjęć z koncertów i festiwali.",
      },
    ],
    "@context": "https://schema.org",
    publisher: {
      logo: {
        url: "https://fleszevents.pl/FE_1_baner.svg",
        "@type": "ImageObject",
      },
      name: "FleszEvents",
      "@type": "Organization",
    },
    description:
      "Portal informacyjny poświęcony wydarzeniom muzycznym, koncertom i festiwalom rockowym oraz metalowym w Polsce.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fleszevents.pl/search?q={search_term_string}",
      // @ts-expect-error - https://github.com/google/schema-dts/issues/114
      "query-input": "required name=search_term_string",
    },
  };

  const { concerts, festivals, premiers, news } = await getLatestArticles(0, 6);

  const { promos } = await getPromoArticles();

  if (!concerts || !festivals || !premiers || !news || !promos) {
    notFound();
  }

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
    </Fragment>
  );
}

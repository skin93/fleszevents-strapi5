import { notFound } from "next/navigation";
import CategoryBlock from "@/components/homepage/category-block";
import { getLatestArticles, getPromoArticles } from "@/lib/data/articles";
import { WebSite, WithContext } from "schema-dts";
import { Fragment } from "react";
import { Patronages } from "@/components/homepage/patronages";
import { getPatronages } from "@/lib/data/patronages";
import LatestArticles from "@/components/ui/custom/latest-articles.";
import { getUpcomingConcerts, getUpcomingFestivals } from "@/lib/data/events";
import EventsCarousel from "@/components/homepage/events-carousel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const jsonLd: WithContext<WebSite> = {
    url: "https://fleszevents.pl/",
    name: "FleszEvents",
    "@type": "WebSite",
    hasPart: [
      {
        url: "https://fleszevents.pl/kalendarz",
        name: "Kalendarz",
        "@type": "WebPage",
        description:
          "Harmonogram nadchodzących koncertów i festiwali muzycznych.",
      },
      {
        url: "https://fleszevents.pl/festiwalowa-map",
        name: "Festiwalowa Mapa",
        "@type": "WebPage",
        description:
          "Interaktywna mapa festiwali rockowych i metalowych w Polsce.",
      },
      {
        url: "https://fleszevents.pl/kontakt",
        name: "Kontakt",
        "@type": "ContactPage",
        description: "Dane kontaktowe redakcji FleszEvents.",
      },
      {
        url: "https://fleszevents.pl/festiwale",
        name: "Festiwale",
        "@type": "CollectionPage",
        description: "Najnowsze informacje, daty i line-upy festiwali.",
      },
      {
        url: "https://fleszevents.pl/koncerty",
        name: "Koncerty",
        "@type": "CollectionPage",
        description: "Zapowiedzi koncertów klubowych i tras koncertowych.",
      },
      {
        url: "https://fleszevents.pl/newsy",
        name: "Newsy",
        "@type": "CollectionPage",
        description: "Aktualności ze świata muzyki alternatywnej i ciężkiej.",
      },
      {
        url: "https://fleszevents.pl/premiery",
        name: "Premiery",
        "@type": "CollectionPage",
        description: "Nowe single, teledyski oraz zapowiedzi albumów.",
      },
      {
        url: "https://fleszevents.pl/relacje",
        name: "Relacje",
        "@type": "CollectionPage",
        description: "Artykuły i fotorelacje z odbytych wydarzeń muzycznych.",
      },
      {
        url: "https://fleszevents.pl/wywiady",
        name: "Wywiady",
        "@type": "CollectionPage",
        description: "Rozmowy z artystami i promotorami sceny muzycznej.",
      },
      {
        url: "https://fleszevents.pl/patronat",
        name: "Patronat",
        "@type": "CollectionPage",
        description: "Wydarzenia objęte patronatem medialnym FleszEvents.",
      },
      {
        url: "https://fleszevents.pl/galerie",
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

  const { promos } = await getPromoArticles();
  const { latest, concerts, festivals, premiers, news, relations } =
    await getLatestArticles(0, 6);
  const { patronages } = await getPatronages();
  const { upcomingConcerts } = await getUpcomingConcerts();
  const { upcomingFestivals } = await getUpcomingFestivals();

  if (
    !concerts ||
    !festivals ||
    !premiers ||
    !news ||
    !promos ||
    !patronages ||
    !upcomingConcerts
  ) {
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
      <main className="bg-foreground/5">
        <div className="grid grid-cols-1 xl:grid-cols-[33.33%_33.33%_33.33%] container mx-auto">
          <EventsCarousel
            label="polecamy"
            category="polecamy"
            promos={promos}
          />
          <EventsCarousel
            label="najblisze koncerty"
            category="koncerty"
            events={upcomingConcerts}
          />
          <EventsCarousel
            label="najblisze festiwale"
            category="festiwale"
            events={upcomingFestivals}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[70%_30%] container mx-auto">
          <div aria-label="category-blocks">
            <CategoryBlock
              articles={festivals}
              name="festivals"
              categorySlug="festiwale"
            />
            <CategoryBlock
              articles={concerts}
              name="concerts"
              categorySlug="koncerty"
            />
            <Patronages patronages={patronages} />
            <CategoryBlock articles={news} name="news" categorySlug="newsy" />
            <CategoryBlock
              articles={premiers}
              name="premiers"
              categorySlug="premiery"
            />
            <CategoryBlock
              articles={relations}
              name="relations"
              categorySlug="relacje"
            />
          </div>
          <aside
            aria-label="latest-articles"
            className="flex flex-col container mx-auto"
          >
            <LatestArticles articles={latest} />
          </aside>
        </div>
      </main>
    </Fragment>
  );
}

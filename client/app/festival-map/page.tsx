import LazyMap from "@/components/ui/custom/lazy-map";

import { WebPage, WithContext } from "schema-dts";
import { Fragment } from "react";
import { getMarkers } from "@/lib/data/festivals";

type Props = {
  searchParams: Promise<{
    city: string;
    festival: string;
    genre: string;
    region: string;
  }>;
};

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Festiwalowa Mapa",
  description:
    "Interaktywna mapa festiwali rockowych i metalowych w Polsce. Znajdź wydarzenia muzyczne w Twojej okolicy, sprawdź lokalizacje i zaplanuj swój festiwalowy sezon.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/festival-map",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/festival-map`,
    title: "Festiwalowa Mapa",
    description:
      "Interaktywna mapa festiwali rockowych i metalowych w Polsce. Znajdź wydarzenia muzyczne w Twojej okolicy, sprawdź lokalizacje i zaplanuj swój festiwalowy sezon.",
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/FE-mapa-2025-01.jpg`,
        width: 1024,
        height: 683,
        alt: "Festiwalowa Mapa FleszEvents",
      },
    ],
  },
};

export default async function FestivalMap({ searchParams }: Props) {
  const params = await searchParams;
  const markers = await getMarkers(params);

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fleszevents.pl/festival-map",
    },
    name: "Festiwalowa Mapa Polski - FleszEvents",
    description:
      "Interaktywna mapa festiwali rockowych i metalowych w Polsce. Znajdź wydarzenia muzyczne w Twojej okolicy, sprawdź lokalizacje i zaplanuj swój festiwalowy sezon.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "FleszEvents",
          item: "https://fleszevents.pl/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Festiwalowa Mapa",
          item: "https://fleszevents.pl/festival-map",
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "FleszEvents",
      logo: {
        "@type": "ImageObject",
        url: "https://fleszevents.pl/FE_1_baner.svg",
      },
    },
    about: {
      "@type": "Map",
      mapType: "VenueMap",
      description:
        "Mapa lokalizacji największych i najciekawszych festiwali muzycznych w Polsce, w tym wydarzeń takich jak Mystic Festival, Pol'and'Rock czy Materiafest.",
    },
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="grid place-content-center">
        <LazyMap markers={markers} />
      </main>
    </Fragment>
  );
}

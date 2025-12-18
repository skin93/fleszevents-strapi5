import LazyMap from "@/components/ui/custom/lazy-map";

import { WebSite, WithContext } from "schema-dts";
import { Fragment } from "react";
import { getMarkers } from "@/lib/data/festivals";

type Props = {
  searchParams: Promise<{ city: string; festival: string; genre: string }>;
};

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Festiwalowa Mapa",
  description: "Sprawdź, czy w Twojej okolicy nie odbywa się fajny festiwal!",
  keywords: ["Festiwalowa mapa", "festiwale w okolicy", "interaktywna mapa"],
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
    description: "Sprawdź, czy w Twojej okolicy nie odbywa się fajny festiwal!",
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

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Festiwalowa Mapa",
    description: "Sprawdź, czy w Twojej okolicy nie odbywa się fajny festiwal!",
    inLanguage: "pl",
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/festival-map`,
    image: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/FE-mapa-2025-01.jpg`,
    publisher: {
      "@type": "Organization",
      name: "FleszEvents",
      image: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
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

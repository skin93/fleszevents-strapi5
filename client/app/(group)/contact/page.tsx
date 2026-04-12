import { Metadata } from "next";
import React, { Fragment } from "react";
import { WebPage, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z redakcją FleszEvents. Formularz kontaktowy, dane redakcji oraz informacje dotyczące współpracy i patronatów medialnych.",
  robots: {
    index: true,
    follow: false,
    googleBot: {
      index: true,
      follow: false,
    },
  },
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: process.env.NEXT_PUBLIC_APP_DOMAIN,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Sprawdź, w jaki sposób możesz nawiązać kontakt!",
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

export default function ContactPage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fleszevents.pl/contact",
    },
    name: "Kontakt - FleszEvents",
    description:
      "Skontaktuj się z redakcją FleszEvents. Formularz kontaktowy, dane redakcji oraz informacje dotyczące współpracy i patronatów medialnych.",
    publisher: {
      "@type": "Organization",
      name: "FleszEvents",
      url: "https://fleszevents.pl/",
      logo: {
        "@type": "ImageObject",
        url: "https://fleszevents.pl/FE_1_baner.svg",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "kontakt@fleszevents.pl",
          contactType: "customer service",
          availableLanguage: "Polish",
        },
      ],
      sameAs: [
        "https://www.facebook.com/flesz.events",
        "https://www.instagram.com/fleszevents",
      ],
    },
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
          name: "Kontakt",
          item: "https://fleszevents.pl/contact",
        },
      ],
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
      <main>
        <section className="flex flex-col items-center justify-center ">
          <h1 className="my-8 text-center uppercase">KONTAKT</h1>
          <p className="my-0">
            Organizujesz festiwal albo w Twojej okolicy odbywa się ciekawe
            wydarzenie? Masz zespół, wydajecie album/singiel albo gracie
            niedługo koncert i szukacie patronatu? A może po prostu potrzebujesz
            nawiązać kontakt? Wyślij wiadomość na{" "}
            <strong>kontakt@fleszevents.pl</strong>
          </p>
        </section>
      </main>
    </Fragment>
  );
}

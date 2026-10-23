import { notFound } from "next/navigation";
import React, { Fragment } from "react";
import { ButtonLink } from "@/components/ui/custom/button-link";
import CustomPagination from "@/components/ui/custom/pagination";
import { getAllTags } from "@/lib/data/tags";
import { CollectionPage, WithContext } from "schema-dts";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home } from "lucide-react";
import Section from "@/components/ui/custom/section";

export async function generateMetadata() {
  return {
    title: "Tagi",
    description:
      "Indeks tematyczny serwisu FleszEvents. Znajdź wszystkie wiadomości, koncerty i relacje dotyczące Twoich ulubionych zespołów oraz festiwali.",
    robots: {
      index: false,
      googleBot: {
        index: false,
      },
    },
    alternates: {
      canonical: "/tagi",
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/tagi`,
      title: "Tagi",
      description:
        "Indeks tematyczny serwisu FleszEvents. Znajdź wszystkie wiadomości, koncerty i relacje dotyczące Twoich ulubionych zespołów oraz festiwali.",
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
}

type Props = {
  searchParams: Promise<{ page: string }>;
};

export default async function TagsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { tags, pageInfo } = await getAllTags(currentPage, 40);

  if (!tags || tags.length === 0) {
    notFound();
  }

  const jsonLd: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fleszevents.pl/tags",
    },
    name: "Tagi i Tematy - FleszEvents",
    description:
      "Indeks tematyczny serwisu FleszEvents. Znajdź wszystkie wiadomości, koncerty i relacje dotyczące Twoich ulubionych zespołów oraz festiwali.",
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
          name: "Tagi",
          item: "https://fleszevents.pl/tagi",
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
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-foreground/5">
        <Section ariaLabel="Tags">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">
                      <Home />
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>TAGI</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 my-6">
            {tags.map((tag) => (
              <ButtonLink
                className="!text-foreground"
                key={tag.documentId}
                href={`/tagi/${tag.slug}`}
              >
                #{tag.name}
              </ButtonLink>
            ))}
          </div>
          <div className="6" />
          <CustomPagination
            currentPage={currentPage}
            pageCount={pageInfo.pageCount}
          />
        </Section>
      </main>
    </Fragment>
  );
}

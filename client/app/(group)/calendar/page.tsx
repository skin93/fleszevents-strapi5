import CustomCalendar from "@/components/custom-calendar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getBookedDays, getEvents } from "@/lib/data/events";
import { Event, Place } from "@/lib/interfaces";
import { Fragment } from "react";
import { WebPage, WithContext } from "schema-dts";
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<
    Pick<Place, "city" | "location" | "region"> &
      Pick<Event, "type"> & { date: Date | null } & { term: string }
  >;
};

export const metadata = {
  title: "Kalendarz",
  description:
    "Sprawdź nadchodzące wydarzenia! Koncerty i festiwale zebrane w jednym miejscu!",
  keywords: ["kalendarz", "festiwale", "koncerty"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/calendar",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/calendar`,
    title: "Kalendarz",
    description:
      "Sprawdź nadchodzące wydarzenia! Koncerty i festiwale zebrane w jednym miejscu!",
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

export default async function CalendarPage({ searchParams }: Props) {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fleszevents.pl/calendar",
    },
    name: "Kalendarz Wydarzeń - FleszEvents",
    description:
      "Ogólnopolski harmonogram koncertów, festiwali oraz tras koncertowych z obszaru muzyki rockowej, metalowej i alternatywnej.",
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
          name: "Kalendarz",
          item: "https://fleszevents.pl/calendar",
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

  const params = await searchParams;
  const date = params.date ? new Date(params.date) : null;

  const rawParams = { ...params, date };

  const [events, allBookedDates] = await Promise.all([
    getEvents({ rawParams }),
    getBookedDays(),
  ]);

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SidebarProvider>
        <CustomCalendar events={events} allBookedDates={allBookedDates} />
        <div className="m-8" />
      </SidebarProvider>
    </Fragment>
  );
}

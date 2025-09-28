import CustomCalendar from "@/components/custom-calendar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUpcomingEvents, getUpcomingEventsAtMonth } from "@/lib/data/events";
import { Fragment } from "react";
import { WebSite, WithContext } from "schema-dts";
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ month: string; year: string }>;
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
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kalendarz",
    description:
      "Sprawdź nadchodzące wydarzenia! Koncerty i festiwale zebrane w jednym miejscu!",
    inLanguage: "pl",
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/calendar`,
    image: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
    publisher: {
      "@type": "Organization",
      name: "FleszEvents",
      image: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
    },
  };

  const { year, month } = await searchParams;

  if (month === undefined && year === undefined) {
    const { events } = await getUpcomingEvents();
    return (
      <SidebarProvider>
        <CustomCalendar events={events} />
      </SidebarProvider>
    );
  } else {
    const monthAsNumber = Number(month) - 1;
    const yearAsNumber = Number(year);
    const { events } = await getUpcomingEventsAtMonth(
      yearAsNumber,
      monthAsNumber
    );
    return (
      <Fragment>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SidebarProvider>
          <CustomCalendar
            events={events}
            month={monthAsNumber}
            year={yearAsNumber}
          />
        </SidebarProvider>
      </Fragment>
    );
  }
}

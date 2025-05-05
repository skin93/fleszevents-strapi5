import { getMediaUrl } from "@/lib/getMediaUrl";
import LazyMap from "@/components/ui/custom/lazy-map";
import { getAllFestivals } from "@/lib/data/festivals";

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
        url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
        width: 1280,
        height: 630,
        alt: "Flesz.Events logo",
      },
    ],
  },
};

export default async function FestivalMap() {
  const { festivals } = await getAllFestivals();
  const markers = festivals.map((fest) => ({
    position: [fest.place?.lat, fest.place?.lng] as [number, number],
    popup: fest.name,
    alt: fest.name,
    id: fest.documentId,
    description: fest.description,
    imageSrc: getMediaUrl(fest.cover!),
    imageWidth: fest.cover!.width,
    imageHeight: fest.cover!.height,
    imageAlt: fest.cover!.alternativeText,
    slug: fest.slug,
    city: fest.place?.city,
    location: fest.place?.location,
    tickets: fest.tickets,
    festName: fest.next_event?.name,
    date: fest.next_event?.date,
    endDate: fest.next_event?.endDate,
  }));
  return (
    <main className="grid place-content-center">
      <LazyMap markers={markers} />
    </main>
  );
}

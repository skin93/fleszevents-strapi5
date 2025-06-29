import { Metadata } from "next";
import { getGalleries } from "@/lib/data/galleries";
import CustomPagination from "@/components/ui/custom/pagination";
import { notFound } from "next/navigation";
import Link from "next/link";
import GalleryCard from "@/components/ui/custom/gallery-card";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Fotorelacje z koncertów i festiwali!",
  keywords: ["galerie", "fotorelacje"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/galerie",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: process.env.NEXT_PUBLIC_APP_DOMAIN,
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: "Fotorelacje z koncertów i festiwali!",
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

type Props = {
  searchParams: Promise<{ page: string }>;
};

export default async function GalleriesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { galleries, pageInfo } = await getGalleries(currentPage, 12);

  if (!galleries || galleries.length == 0) {
    notFound();
  }

  return (
    <main>
      <section aria-label="Galleries">
        <h1 className="my-8 text-center font-bold uppercase">GALERIE</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          {galleries.map((gallery) => (
            <div key={gallery.documentId}>
              <Link href={`/galleries/${gallery.slug}`}>
                <GalleryCard gallery={gallery} />
              </Link>
            </div>
          ))}
        </div>
        <div className="my-8" />
        <CustomPagination
          currentPage={currentPage}
          pageCount={pageInfo.pageCount}
        />
      </section>
    </main>
  );
}

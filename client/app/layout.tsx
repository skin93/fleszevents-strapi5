import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const playpen = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: process.env.NEXT_PUBLIC_APP_NAME,
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    default: `${process.env.NEXT_PUBLIC_APP_NAME}`,
  },
  description:
    "Portal informacyjny poświęcony wydarzeniom muzycznym, koncertom i festiwalom rockowym oraz metalowym w Polsce.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_DOMAIN}`),
  alternates: {
    canonical: "/",
  },
  facebook: {
    appId: `${process.env.NEXT_PUBLIC_FB_ID}`,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: process.env.NEXT_PUBLIC_APP_DOMAIN,
    title: {
      template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
      default: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    },
    description:
      "Portal informacyjny poświęcony wydarzeniom muzycznym, koncertom i festiwalom rockowym oraz metalowym w Polsce.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="FleszEvents" />
      </head>
      <body className={`${playpen.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#0d9488" height={5} />
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}

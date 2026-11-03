import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_DOMAIN || "https://twojadomena.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/_next/",
        "/api/",
        "/polecamy/",
        "/patronat/",
        "/tagi/",
        "/tags/",
        "/szukaj",
        "/search",
        "/uploads/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

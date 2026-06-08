export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/tagi/", "/tags/", "/szukaj", "/search", "/uploads/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/sitemap.xml`,
  };
}

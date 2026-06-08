import { MetadataRoute } from "next";
import { getArticlesSitemap } from "@/lib/data/articles";
import { connection } from "next/server";
import { getGalleriesSitemap } from "@/lib/data/galleries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const { articles } = await getArticlesSitemap();
  const { galleries } = await getGalleriesSitemap();
  const articlesEntries = articles.flatMap((article) =>
    article.categories.map((category) => ({
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/${category.slug}/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "daily",
      priority: 0.7,
    })),
  ) as MetadataRoute.Sitemap;
  const galleriesEntries = galleries.map(({ slug, updatedAt }) => ({
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/galerie/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  })) as MetadataRoute.Sitemap;
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/festiwalowa-mapa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/galerie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...articlesEntries,
    ...galleriesEntries,
  ];
}

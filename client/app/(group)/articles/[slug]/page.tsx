import SlugPageComponent from "@/components/slug-page";

import { getArticleBySlug, getArticleInfo } from "@/lib/data/articles";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Article, WithContext } from "schema-dts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // read route params
  const { slug } = await params;

  // fetch data
  //   const { seo } = await getArticleMeta(slug);

  //   return {
  //     title: seo.metaTitle,
  //     description: seo.metaDescription,
  //     keywords: seo.keywords,
  //     robots: {
  //       index: seo.robotsIndex,
  //       follow: seo.robotsFollow,
  //       googleBot: {
  //         index: seo.googleIndex,
  //         follow: seo.googleFollow,
  //       },
  //     },
  //     alternates: {
  //       canonical: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
  //     },
  //     openGraph: {
  //       type: "article",
  //       url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
  //       title: seo.openGraph?.ogTitle,
  //       description: seo.openGraph?.ogDescription,
  //       images: [
  //         {
  //           url: `${process.env.NEXT_PUBLIC_STRAPI}/${seo.openGraph?.ogImage?.url}`,
  //           width: seo.openGraph?.ogImage?.width,
  //           height: seo.openGraph?.ogImage?.height,
  //           alt: seo.openGraph?.ogImage?.alternativeText,
  //         },
  //       ],
  //     },
  //   };
  // }

  const { info } = await getArticleInfo(slug);

  return {
    title: info.title,
    description: info.excerpt,
    // keywords: seo.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${slug}`,
      title: info.title,
      description: "",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI}/${info.cover.url}`,
          width: info.cover.width,
          height: info.cover.height,
          alt: info.cover.alternativeText,
        },
      ],
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt?.toLocaleString(),
    dateModified: article.updatedAt?.toLocaleString(),
    inLanguage: "pl",
    image: `${process.env.NEXT_PUBLIC_STRAPI}/${article.cover.url}`,
    description: article.excerpt,
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/articles/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "FleszEvents",
      image: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
    },
    author: [
      {
        "@type": "Person",
        name: article.authors[0].name,
      },
    ],
  };

  if (!article) {
    notFound();
  }

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {<SlugPageComponent article={article} />}
    </Fragment>
  );
}

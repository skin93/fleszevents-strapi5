import { grafbase } from "@/lib/graphql";
import { LATEST_ARTICLES_QUERY } from "@/lib/queries/articles/latestArticlesQuery";
// import { SINGLE_ARTICLE_QUERY } from "@/lib/queries/articles/singleArticleQuery";
// import { SINGLE_ARTICLE_META_QUERY } from "@/lib/queries/articles/singleArticleMetaQuery";
// import { ARTICLES_BY_TERM_QUERY } from "@/lib/queries/articles/articlesByTermQuery";
import { LatestArticles } from "../interfaces";
// import { ARTICLES_SITEMAP_QUERY } from "@/lib/queries/articles/articlesSitemapQuery.ts";

export async function getLatestArticles(start: number, limit: number) {
  const res = await grafbase.request<LatestArticles>(LATEST_ARTICLES_QUERY, {
    start,
    limit,
  });

  return {
    news: res.news[0],
    concerts: res.concerts[0],
    festivals: res.festivals[0],
    premiers: res.premiers[0],
    promos: res.promos[0],
  };
}

// export async function getArticleBySlug(slug) {
//   const res = await grafbase.request(SINGLE_ARTICLE_QUERY, {
//     slug,
//   });
//   return { article: res.articles[0] };
// }

// export async function getArticleMeta(slug) {
//   const res = await grafbase.request(SINGLE_ARTICLE_META_QUERY, {
//     slug,
//   });
//   return { seo: res.articles[0] };
// }

// export async function getArticlesSitemap() {
//   const res = await grafbase.request(ARTICLES_SITEMAP_QUERY);
//   return { articles: res.articles };
// }

// export async function getArticlesByTerm(term, start, limit) {
//   const res = await grafbase.request(ARTICLES_BY_TERM_QUERY, {
//     term,
//   });

//   return {
//     termInContent: res.termInContent,
//     termInTitle: res.termInTitle,
//   };
// }

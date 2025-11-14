import { grafbase } from "@/lib/graphql";
import { LATEST_ARTICLES_QUERY } from "@/lib/queries/articles/latestArticlesQuery";
import { SINGLE_ARTICLE_QUERY } from "@/lib/queries/articles/singleArticleQuery";
import { SINGLE_ARTICLE_META_QUERY } from "@/lib/queries/articles/singleArticleMetaQuery";
import {
  Articles,
  ArticlesConnection,
  ArticlesSitemap,
  LatestArticles,
} from "../interfaces";
import { ARTICLES_BY_TERM_QUERY } from "../queries/articles/articlesByTermQuery";
import { SINGLE_ARTICLE_INFO_QUERY } from "../queries/articles/singleArticleInfoQuery";
import { ARTICLES_SITEMAP_QUERY } from "../queries/articles/articlesSitemapQuery";
import { PROMO_ARTICLES_QUERY } from "../queries/articles/promoArticlesQuery";

export async function getLatestArticles(start: number, limit: number) {
  const res = await grafbase.request<LatestArticles>(LATEST_ARTICLES_QUERY, {
    start,
    limit,
  });

  return {
    news: res.news.nodes,
    concerts: res.concerts.nodes,
    festivals: res.festivals.nodes,
    premiers: res.premiers.nodes,
  };
}

export async function getPromoArticles() {
  const res = await grafbase.request<Articles>(PROMO_ARTICLES_QUERY);

  return { promos: res.articles };
}

export async function getArticleBySlug(slug: string) {
  const res = await grafbase.request<Articles>(SINGLE_ARTICLE_QUERY, {
    slug,
  });
  return { article: res.articles[0] };
}

export async function getArticleMeta(slug: string) {
  const res = await grafbase.request<Articles>(SINGLE_ARTICLE_META_QUERY, {
    slug,
  });
  return { seo: res.articles[0].seo };
}

export async function getArticleInfo(slug: string) {
  const res = await grafbase.request<Articles>(SINGLE_ARTICLE_INFO_QUERY, {
    slug,
  });
  return { info: res.articles[0] };
}

export async function getArticlesSitemap() {
  const res = await grafbase.request<ArticlesSitemap>(ARTICLES_SITEMAP_QUERY);
  return { articles: res.articles };
}

export async function getArticlesByTerm(
  term: string,
  page: number,
  pageSize: number
) {
  const res = await grafbase.request<ArticlesConnection>(
    ARTICLES_BY_TERM_QUERY,
    {
      term,
      page,
      pageSize,
    }
  );

  return {
    articles: res.articles_connection.nodes,
    pageInfo: res.articles_connection.pageInfo,
  };
}

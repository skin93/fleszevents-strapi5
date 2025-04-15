import { grafbase } from "../graphql";
import { ArticlesConnection, Categories } from "../interfaces";
import { ARTICLES_BY_CATEGORY_QUERY } from "../queries/articles/articlesByCategoryQuery";
import { SINGLE_CATEGORY_META_QUERY } from "../queries/categories/categoryMetaQuery";

export async function getArticlesByCategory(
  category: string,
  page: number,
  pageSize: number
) {
  const res = await grafbase.request<ArticlesConnection>(
    ARTICLES_BY_CATEGORY_QUERY,
    {
      category,
      page,
      pageSize,
    }
  );

  return {
    articles: res.articles_connection.nodes,
    pageInfo: res.articles_connection.pageInfo,
  };
}

export async function getCategoryMeta(slug: string) {
  const res = await grafbase.request<Categories>(SINGLE_CATEGORY_META_QUERY, {
    slug,
  });
  return { seo: res.categories[0].seo };
}

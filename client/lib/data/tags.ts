import { grafbase } from "../graphql";
import { ArticlesConnection, Tags } from "../interfaces";
import { ARTICLES_BY_TAG_QUERY } from "../queries/articles/articlesByTagQuery";
import { SINGLE_TAG_META_QUERY } from "../queries/tags/tagMetaQuery";

export async function getArticlesByTag(
  tag: string,
  page: number,
  pageSize: number
) {
  const res = await grafbase.request<ArticlesConnection>(
    ARTICLES_BY_TAG_QUERY,
    {
      tag,
      page,
      pageSize,
    }
  );

  return {
    articles: res.articles_connection.nodes,
    pageInfo: res.articles_connection.pageInfo,
  };
}

// export async function getAllTags(start, limit) {
//   const res = await grafbase.request(ALL_TAGS_QUERY, { start, limit });
//   return {
//     tags: res.tags,
//     totalCount: res.tagsConnection.aggregate.totalCount,
//   };
// }

export async function getTagMeta(slug: string) {
  const res = await grafbase.request<Tags>(SINGLE_TAG_META_QUERY, {
    slug,
  });
  return { seo: res.tags[0].seo };
}

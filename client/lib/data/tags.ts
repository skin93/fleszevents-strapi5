import { grafbase } from "../graphql";
import { ArticlesConnection, Tags, TagsConnection } from "../interfaces";
import { ARTICLES_BY_TAG_QUERY } from "../queries/articles/articlesByTagQuery";
import { ALL_TAGS_QUERY } from "../queries/tags/allTagsQuery";
import { SINGLE_TAG_QUERY } from "../queries/tags/tagQuery";

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

export async function getAllTags(page: number, pageSize: number) {
  const res = await grafbase.request<TagsConnection>(ALL_TAGS_QUERY, {
    page,
    pageSize,
  });
  return {
    tags: res.tags_connection.nodes,
    pageInfo: res.tags_connection.pageInfo,
  };
}

export async function getTag(slug: string) {
  const res = await grafbase.request<Tags>(SINGLE_TAG_QUERY, {
    slug,
  });
  return { tag: res.tags[0] };
}

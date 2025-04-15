import { gql } from "graphql-request";
export const ARTICLES_BY_TAG_QUERY = gql`
  query articlesByTagQuery($tag: String!, $page: Int!, $pageSize: Int!) {
    articles_connection(
      status: PUBLISHED
      filters: { tags: { slug: { eq: $tag } } }
      pagination: { page: $page, pageSize: $pageSize }
      sort: "createdAt:desc"
    ) {
      pageInfo {
        page
        pageSize
        total
        pageCount
      }
      nodes {
        documentId
        title
        slug
        content
        publishedAt
        cover {
          width
          height
          alternativeText
          url
          caption
        }
      }
    }
  }
`;

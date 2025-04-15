import { gql } from "graphql-request";
export const ARTICLES_BY_CATEGORY_QUERY = gql`
  query articlesByCategoryQuery(
    $category: String!
    $page: Int!
    $pageSize: Int!
  ) {
    articles_connection(
      status: PUBLISHED
      filters: { categories: { slug: { eq: $category } } }
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

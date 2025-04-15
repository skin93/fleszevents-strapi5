import { gql } from "graphql-request";
export const ARTICLES_BY_TERM_QUERY = gql`
  query articlesByTermQuery($term: String!, $page: Int!, $pageSize: Int!) {
    articles_connection(
      status: PUBLISHED
      sort: "publishedAt:DESC"
      pagination: { page: $page, pageSize: $pageSize }
      filters: {
        or: [{ content: { containsi: $term }, title: { containsi: $term } }]
      }
    ) {
      nodes {
        documentId
        title
        slug
        createdAt
        cover {
          alternativeText
          url
          width
          height
        }
        categories {
          name
          slug
        }
      }
      pageInfo {
        page
        pageCount
        pageSize
        total
      }
    }
  }
`;

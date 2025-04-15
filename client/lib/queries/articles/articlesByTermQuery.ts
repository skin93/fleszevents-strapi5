import { gql } from "graphql-request";
export const ARTICLES_BY_TERM_QUERY = gql`
  query articlesByTermQuery($term: String!) {
    articles_connection(
      status: PUBLISHED
      sort: "publishedAt:DESC"
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

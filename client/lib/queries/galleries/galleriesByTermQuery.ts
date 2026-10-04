import { gql } from "graphql-request";
export const GALLERIES_BY_TERM_QUERY = gql`
  query galleriesByTermQuery($term: String!, $page: Int!, $pageSize: Int!) {
    galleries_connection(
      sort: "createdAt:DESC"
      pagination: { page: $page, pageSize: $pageSize }
      filters: { name: { containsi: $term } }
    ) {
      nodes {
        documentId
        name
        slug
        createdAt
        cover {
          alternativeText
          url
          width
          height
          blurDataURL
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

import { gql } from "graphql-request";
export const GALLERIES_QUERY = gql`
  query galleriesQuery($page: Int!, $pageSize: Int!) {
    galleries_connection(
      pagination: { page: $page, pageSize: $pageSize }
      sort: "createdAt:desc"
    ) {
      nodes {
        documentId
        publishedAt
        name
        slug
        cover {
          width
          height
          alternativeText
          url
        }
        tags {
          name
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

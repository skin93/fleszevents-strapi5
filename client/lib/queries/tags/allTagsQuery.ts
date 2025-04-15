import { gql } from "graphql-request";
export const ALL_TAGS_QUERY = gql`
  query allTagsQuery($page: Int!, $pageSize: Int!) {
    tags_connection(
      pagination: { page: $page, pageSize: $pageSize }
      sort: "slug:asc"
    ) {
      nodes {
        documentId
        slug
        name
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

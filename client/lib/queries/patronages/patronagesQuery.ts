import { gql } from "graphql-request";
export const PATRONAGES_QUERY = gql`
  query patronagesQuery {
    patronages(sort: "createdAt:asc") {
      documentId
      name
      cover {
        alternativeText
        url
        width
        height
      }
    }
  }
`;

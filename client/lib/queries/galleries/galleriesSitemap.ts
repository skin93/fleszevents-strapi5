import { gql } from "graphql-request";
export const GALLERIES_SITEMAP_QUERY = gql`
  query {
    galleries(sort: "updatedAt:DESC", pagination: { limit: -1 }) {
      documentId
      name
      slug
      updatedAt
    }
  }
`;

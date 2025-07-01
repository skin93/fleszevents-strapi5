import { gql } from "graphql-request";
export const ARTICLES_SITEMAP_QUERY = gql`
  query {
    articles(sort: "updatedAt:DESC") {
      documentId
      title
      slug
      updatedAt
    }
  }
`;

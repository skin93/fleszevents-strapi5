import { gql } from "graphql-request";
export const SINGLE_ARTICLE_STRUCTURED_DATA_QUERY = gql`
  query singleArticleStructuredDataQuery($slug: String!) {
    articles(filters: { slug: { eq: $slug } }, status: PUBLISHED) {
      seo {
        structuredData
      }
    }
  }
`;

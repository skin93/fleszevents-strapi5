import { gql } from "graphql-request";
export const PROMO_ARTICLES_QUERY = gql`
  query promoArticlesQuery {
    articles(
      status: PUBLISHED
      filters: { categories: { slug: { eq: "polecamy" } } }
      sort: "createdAt:desc"
    ) {
      documentId
      title
      slug
      publishedAt
      cover {
        alternativeText
        url
        width
        height
      }
    }
  }
`;

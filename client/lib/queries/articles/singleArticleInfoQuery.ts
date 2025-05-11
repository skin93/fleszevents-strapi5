import { gql } from "graphql-request";
export const SINGLE_ARTICLE_INFO_QUERY = gql`
  query singleArticleInfoQuery($slug: String!) {
    articles(filters: { slug: { eq: $slug } }, status: PUBLISHED) {
      title
      excerpt
      cover {
        url
        alternativeText
        caption
        width
        height
      }
    }
  }
`;

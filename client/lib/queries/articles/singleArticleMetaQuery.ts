import { gql } from "graphql-request";
export const SINGLE_ARTICLE_META_QUERY = gql`
  query singleArticleMetaQuery($slug: String!) {
    articles(filters: { slug: { eq: $slug } }, status: PUBLISHED) {
      seo {
        metaTitle
        metaDescription
        openGraph {
          id
          ogDescription
          ogTitle
          ogType
          ogUrl
          ogImage {
            url
            caption
            alternativeText
            width
            height
          }
        }
        googleFollow
        robotsFollow
        googleIndex
        robotsIndex
        metaImage {
          url
          caption
          alternativeText
          width
          height
        }
      }
    }
  }
`;

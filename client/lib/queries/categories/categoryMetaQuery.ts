import { gql } from "graphql-request";
export const SINGLE_CATEGORY_META_QUERY = gql`
  query singleCategoryMetaQuery($slug: String!) {
    categories(filters: { slug: { eq: $slug } }) {
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

import { gql } from "graphql-request";
export const GALLERY_META_QUERY = gql`
  query galleryMetaQuery($slug: String!) {
    galleries(filters: { slug: { eq: $slug } }) {
      seo {
        id
        metaTitle
        metaDescription
        metaImage {
          documentId
          alternativeText
          width
          height
          url
        }
        robotsIndex
        robotsFollow
        googleIndex
        googleFollow
        canonicalURL
        openGraph {
          id
          ogTitle
          ogDescription
          ogImage {
            documentId
            alternativeText
            width
            height
            url
          }
        }
      }
    }
  }
`;

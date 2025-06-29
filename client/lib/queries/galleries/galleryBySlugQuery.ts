import { gql } from "graphql-request";
export const GALLERY_BY_SLUG_QUERY = gql`
  query galleryQuery($slug: String!) {
    galleries(filters: { slug: { eq: $slug } }) {
      publishedAt
      name
      slug
      photos(sort: "name:asc", pagination: { limit: -1 }) {
        documentId
        alternativeText
        caption
        width
        height
        url
        createdAt
      }
      tags {
        name
      }
    }
  }
`;

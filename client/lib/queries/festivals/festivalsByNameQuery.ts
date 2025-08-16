import { gql } from "graphql-request";
export const FESTIVAL_BY_SLUG_QUERY = gql`
  query festivalByNameQuery($slug: String!) {
    festivals(filters: { slug: { eq: $slug } }) {
      documentId
      name
      description
      slug
      place {
        city
        documentId
        location
        lat
        lng
      }
      music_types {
        name
      }
      next_event {
        date
        endDate
        article {
          slug
        }
      }
      cover {
        url
        width
        height
        alternativeText
      }
      tickets
    }
  }
`;

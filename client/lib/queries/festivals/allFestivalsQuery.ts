import { gql } from "graphql-request";
export const ALL_FESTIVALS_QUERY = gql`
  query allFestivalsQuery {
    festivals(pagination: { limit: -1 }) {
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
      next_event {
        date
        endDate
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

import { gql } from "graphql-request";
export const ALL_FESTIVALS_QUERY = gql`
  query allFestivalsQuery {
    festivals {
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
    }
  }
`;

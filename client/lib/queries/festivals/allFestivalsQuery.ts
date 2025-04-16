import { gql } from "graphql-request";
export const ALL_FESTIVALS_QUERY = gql`
  query allFestivalsQuery {
    festivals(status: PUBLISHED) {
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
      date
      endDate
      cover {
        url
        width
        height
        alternativeText
      }
    }
  }
`;

import { gql } from "graphql-request";
export const ALL_FESTIVALS_QUERY = gql`
  query allFestivals(
    $city: String
    $location: String
    $festival: String
    $region: String
    $genre: String
  ) {
    festivals(
      filters: {
        place: {
          city: { eqi: $city }
          location: { eqi: $location }
          region: { eqi: $region }
        }
        music_types: { name: { eqi: $genre } }
        name: { eqi: $festival }
      }
      pagination: { limit: -1 }
    ) {
      documentId
      name
      description
      slug
      place {
        city
        location
        region
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

import { gql } from "graphql-request";
export const ALL_FESTIVALS_QUERY = gql`
  query allFestivals($city: String, $festival: String, $genre: String) {
    festivals(
      filters: {
        place: { city: { containsi: $city } }
        music_types: { name: { containsi: $genre } }
        name: { containsi: $festival }
      }
      pagination: { limit: -1 }
    ) {
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

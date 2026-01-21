import { gql } from "graphql-request";
export const UPCOMING_EVENTS_QUERY = gql`
  query upcomingEventsQuery(
    $dateFilter: DateFilterInput!
    $city: String
    $location: String
    $type: String
    $region: String
    $term: String
  ) {
    events(
      pagination: { limit: -1 }
      sort: "date:asc"
      filters: {
        date: $dateFilter
        type: { eqi: $type }
        name: { containsi: $term }
        place: {
          city: { containsi: $city }
          location: { containsi: $location }
          region: { eqi: $region }
        }
      }
    ) {
      documentId
      name
      date
      endDate
      type
      article {
        slug
      }
      place {
        city
        documentId
        location
        region
        inPoland
      }
    }
  }
`;

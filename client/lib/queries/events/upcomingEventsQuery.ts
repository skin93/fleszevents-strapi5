import { gql } from "graphql-request";
export const UPCOMING_EVENTS_QUERY = gql`
  query upcomingEventsQuery(
    $dateFilter: DateFilterInput!
    $city: String
    $location: String
  ) {
    events(
      pagination: { limit: -1 }
      sort: "date:asc"
      filters: {
        date: $dateFilter
        place: {
          city: { containsi: $city }
          location: { containsi: $location }
        }
      }
    ) {
      documentId
      name
      date
      endDate
      article {
        slug
      }
      place {
        city
        documentId
        location
      }
    }
  }
`;

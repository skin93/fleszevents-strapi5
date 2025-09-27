import { gql } from "graphql-request";
export const UPCOMING_EVENTS_QUERY = gql`
  query upcomingEventsQuery($today: Date!) {
    events(
      pagination: { limit: -1 }
      sort: "date:asc"
      filters: { date: { gte: $today } }
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

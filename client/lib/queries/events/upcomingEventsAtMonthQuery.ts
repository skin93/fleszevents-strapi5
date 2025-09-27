import { gql } from "graphql-request";
export const UPCOMING_EVENTS_AT_MONTH_QUERY = gql`
  query upcomingEventsAtMonthQuery(
    $today: Date!
    $firstDayOfMonth: Date!
    $lastDayOfMonth: Date!
  ) {
    events(
      pagination: { limit: -1 }
      sort: "date:asc"
      filters: {
        date: { between: [$firstDayOfMonth, $lastDayOfMonth], gte: $today }
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

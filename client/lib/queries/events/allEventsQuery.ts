import { gql } from "graphql-request";
export const ALL_EVENTS_QUERY = gql`
  query allEventsQuery {
    events(pagination: { limit: -1 }, sort: "date:asc") {
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

import { gql } from "graphql-request";

export const ALL_DATES_QUERY = gql`
  query allDatesQuery($date: Date!) {
    events(filters: { date: { gte: $date } }, pagination: { limit: -1 }) {
      date
    }
  }
`;

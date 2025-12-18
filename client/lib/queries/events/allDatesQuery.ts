import { gql } from "graphql-request";

export const ALL_DATES_QUERY = gql`
  query allDatesQuery {
    events(pagination: { limit: -1 }) {
      date
    }
  }
`;

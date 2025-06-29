import { gql } from "graphql-request";
export const ALL_MUSIC_TYPES_QUERY = gql`
  query allMusicTypesQuery {
    musicTypes(pagination: { limit: -1 }) {
      name
    }
  }
`;

import { gql } from "graphql-request";
export const ALL_CATEGORIES_QUERY = gql`
  query allCategoriesQuery {
    categories {
      name
      slug
    }
  }
`;

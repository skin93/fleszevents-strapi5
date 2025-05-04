import { gql } from "graphql-request";
export const SINGLE_CATEGORY_QUERY = gql`
  query singleCategoryQuery($slug: String!) {
    categories(filters: { slug: { eq: $slug } }) {
      name
      description
      slug
    }
  }
`;

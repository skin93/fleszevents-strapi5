import { gql } from "graphql-request";
export const SINGLE_TAG_QUERY = gql`
  query singleTagQuery($slug: String!) {
    tags(filters: { slug: { eq: $slug } }) {
      name
      slug
    }
  }
`;

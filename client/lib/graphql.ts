import { GraphQLClient } from "graphql-request";
export { gql } from "graphql-request";

const API_STRAPI = process.env.API_STRAPI as string;

export const grafbase = new GraphQLClient(API_STRAPI, {
  headers: {
    authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

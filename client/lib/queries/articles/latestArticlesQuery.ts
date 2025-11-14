import { gql } from "graphql-request";
export const LATEST_ARTICLES_QUERY = gql`
  query latestArticlesQuery($start: Int!, $limit: Int!) {
    news: articles_connection(
      status: PUBLISHED
      filters: { categories: { slug: { eq: "newsy" } } }
      pagination: { start: $start, limit: $limit }
      sort: "createdAt:desc"
    ) {
      nodes {
        documentId
        title
        slug
        publishedAt
        cover {
          alternativeText
          url
          width
          height
        }
      }
    }
    concerts: articles_connection(
      status: PUBLISHED
      filters: { categories: { slug: { eq: "koncerty" } } }
      pagination: { start: $start, limit: $limit }
      sort: "createdAt:desc"
    ) {
      nodes {
        documentId
        title
        slug
        publishedAt
        cover {
          alternativeText
          url
          width
          height
        }
      }
    }
    festivals: articles_connection(
      status: PUBLISHED
      filters: { categories: { slug: { eq: "festiwale" } } }
      pagination: { start: $start, limit: $limit }
      sort: "createdAt:desc"
    ) {
      nodes {
        documentId
        title
        slug
        publishedAt
        cover {
          alternativeText
          url
          width
          height
        }
      }
    }
    premiers: articles_connection(
      status: PUBLISHED
      filters: { categories: { slug: { eq: "premiery" } } }
      pagination: { start: $start, limit: $limit }
      sort: "createdAt:desc"
    ) {
      nodes {
        documentId
        title
        slug
        publishedAt
        cover {
          alternativeText
          url
          width
          height
        }
      }
    }
  }
`;

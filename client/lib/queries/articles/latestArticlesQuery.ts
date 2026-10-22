import { gql } from "graphql-request";
export const LATEST_ARTICLES_QUERY = gql`
  query latestArticlesQuery($start: Int!, $limit: Int!) {
    latest: articles_connection(
      status: PUBLISHED
      pagination: { start: 0, limit: 24 }
      sort: "createdAt:desc"
    ) {
      nodes {
        documentId
        title
        slug
        excerpt
        categories {
          slug
          name
        }
        createdAt
        publishedAt
        cover {
          alternativeText
          url
          width
          height
          blurDataURL
        }
      }
    }
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
        excerpt
        categories {
          slug
          name
        }
        createdAt
        publishedAt
        cover {
          alternativeText
          url
          width
          height
          blurDataURL
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
        excerpt
        categories {
          slug
          name
        }
        createdAt
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
        excerpt
        categories {
          slug
          name
        }
        createdAt
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
        excerpt
        categories {
          slug
          name
        }
        createdAt
        publishedAt
        cover {
          alternativeText
          url
          width
          height
        }
      }
    }
    relations: articles_connection(
      status: PUBLISHED
      filters: { categories: { slug: { eq: "relacje" } } }
      pagination: { start: $start, limit: $limit }
      sort: "createdAt:desc"
    ) {
      nodes {
        documentId
        title
        slug
        excerpt
        categories {
          slug
          name
        }
        createdAt
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

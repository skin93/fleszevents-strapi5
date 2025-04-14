import { gql } from "graphql-request";
export const LATEST_ARTICLES_QUERY = gql`
  query latestArticlesQuery($start: Int!, $limit: Int!) {
    news: categories(filters: { slug: { eq: "newsy" } }) {
      documentId
      slug
      articles(
        sort: "createdAt:DESC"
        pagination: { start: $start, limit: $limit }
        filters: { publishedAt: { notNull: null } }
      ) {
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
    concerts: categories(filters: { slug: { eq: "koncerty" } }) {
      documentId
      slug
      articles(
        sort: "createdAt:DESC"
        pagination: { start: $start, limit: $limit }
        filters: { publishedAt: { notNull: null } }
      ) {
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
    festivals: categories(filters: { slug: { eq: "festiwale" } }) {
      documentId
      slug
      articles(
        sort: "createdAt:DESC"
        pagination: { start: $start, limit: $limit }
        filters: { publishedAt: { notNull: null } }
      ) {
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
    premiers: categories(filters: { slug: { eq: "premiery" } }) {
      documentId
      slug
      articles(
        sort: "createdAt:DESC"
        pagination: { start: $start, limit: $limit }
        filters: { publishedAt: { notNull: null } }
      ) {
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
    promos: categories(filters: { slug: { eq: "polecamy" } }) {
      documentId
      slug
      articles(
        sort: "createdAt:DESC"
        filters: { publishedAt: { notNull: null } }
      ) {
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

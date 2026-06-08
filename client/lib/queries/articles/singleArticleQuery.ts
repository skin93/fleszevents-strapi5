import { gql } from "graphql-request";
export const SINGLE_ARTICLE_QUERY = gql`
  query singleArticleQuery($articleSlug: String!, $categorySlug: String) {
    articles(
      filters: {
        slug: { eq: $articleSlug }
        categories: { slug: { eq: $categorySlug } }
      }
      status: PUBLISHED
    ) {
      documentId
      title
      excerpt
      content
      slug
      seo {
        structuredData
      }
      cover {
        url
        alternativeText
        caption
        width
        height
      }
      categories {
        documentId
        name
        slug
      }
      tags(pagination: { limit: -1 }) {
        documentId
        name
        slug
      }
      isFestival
      festival {
        slug
        name
      }
      publishedAt
      createdAt
      authors {
        name
        documentId
      }
      gallery {
        id
        images(sort: "name:asc", pagination: { limit: -1 }) {
          documentId
          url
          alternativeText
          caption
          width
          height
        }
      }
      relatedArticles {
        articles(sort: "createdAt:DESC") {
          documentId
          title
          slug
          categories {
            name
            slug
          }
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
  }
`;

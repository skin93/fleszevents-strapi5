import { gql } from "graphql-request";
export const SINGLE_ARTICLE_QUERY = gql`
  query singleArticleQuery($slug: String!) {
    articles(filters: { slug: { eq: $slug } }, status: PUBLISHED) {
      documentId
      title
      excerpt
      content
      slug
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

      tags {
        documentId
        name
        slug
      }
      isFestival
      festival {
        slug
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

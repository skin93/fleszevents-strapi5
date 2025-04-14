import { gql } from "graphql-request";
export const SINGLE_ARTICLE_QUERY = gql`
  query singleArticleQuery($slug: String!) {
    articles(filters: { slug: { eq: $slug } }, status: PUBLISHED) {
      documentId
      title
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
      publishedAt
      createdAt
      authors {
        name
        documentId
      }
      relatedArticles {
        articles(sort: "publishedAt:DESC") {
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

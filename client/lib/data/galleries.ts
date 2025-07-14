import { grafbase } from "../graphql";
import {
  Galleries,
  GalleriesConnection,
  GalleriesSitemap,
} from "../interfaces";
import { GALLERIES_QUERY } from "../queries/galleries/galleriesQuery";
import { GALLERIES_SITEMAP_QUERY } from "../queries/galleries/galleriesSitemap";
import { GALLERY_BY_SLUG_QUERY } from "../queries/galleries/galleryBySlugQuery";
import { GALLERY_META_QUERY } from "../queries/galleries/galleryMetaQuery";

export async function getGalleries(page: number, pageSize: number) {
  const res = await grafbase.request<GalleriesConnection>(GALLERIES_QUERY, {
    page,
    pageSize,
  });

  return {
    galleries: res.galleries_connection.nodes,
    pageInfo: res.galleries_connection.pageInfo,
  };
}

export async function getGalleryBySlug(slug: string) {
  const res = await grafbase.request<Galleries>(GALLERY_BY_SLUG_QUERY, {
    slug,
  });

  return {
    gallery: res.galleries[0],
  };
}

export async function getGalleryMeta(slug: string) {
  const res = await grafbase.request<Galleries>(GALLERY_META_QUERY, {
    slug,
  });

  return { seo: res.galleries[0].seo };
}

export async function getGalleriesSitemap() {
  const res = await grafbase.request<GalleriesSitemap>(GALLERIES_SITEMAP_QUERY);
  return { galleries: res.galleries };
}

import { Media } from "@/lib/interfaces";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI;

export function getMediaUrl(media: Media) {
  return `${STRAPI}${media.url}`;
}

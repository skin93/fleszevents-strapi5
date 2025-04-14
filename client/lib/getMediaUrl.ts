import { Media } from "@/lib/interfaces";

const STRAPI = process.env.STRAPI;

export function getMediaUrl(media: Media) {
  return `${STRAPI}${media.url}`;
}

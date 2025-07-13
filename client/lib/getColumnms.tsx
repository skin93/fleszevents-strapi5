import { Media } from "./interfaces";

export function getColumns(
  images: Media[],
  colIndex: number,
  maxColumns: number
) {
  return images.filter((photo, idx) => idx % maxColumns === colIndex);
}

import { unstable_cache } from "next/cache";
import { festivalsSearchParamsSchema } from "../validation";
import { ALL_FESTIVALS_QUERY } from "../queries/festivals/allFestivalsQuery";
import { Festival, Festivals } from "../interfaces";
import { getMediaUrl } from "../getMediaUrl";
import { grafbase } from "../graphql";

function createMarkers(festivals: Festival[]) {
  const markers = festivals.map((fest) => ({
    position: [fest.place?.lat, fest.place?.lng] as [number, number],
    popup: fest.name,
    alt: fest.name,
    id: fest.documentId,
    description: fest.description,
    imageSrc: getMediaUrl(fest.cover!),
    imageWidth: fest.cover!.width,
    imageHeight: fest.cover!.height,
    imageAlt: fest.cover!.alternativeText,
    slug: fest.slug,
    city: fest.place?.city,
    location: fest.place?.location,
    tickets: fest.tickets,
    festName: fest.next_event?.name,
    date: fest.next_event?.date,
    endDate: fest.next_event?.endDate,
    articleSlug: fest.next_event?.article?.slug,
    music_types: fest.music_types,
  }));

  return markers;
}

export async function getCachedMarkers(rawParams: {
  city: string;
  festival: string;
  genre: string;
}) {
  const validated = festivalsSearchParamsSchema.parse(rawParams);

  return unstable_cache(
    async () => {
      const res = await grafbase.request<Festivals>(ALL_FESTIVALS_QUERY, {
        city: validated.city || undefined,
        festival: validated.festival || undefined,
        genre: validated.genre || undefined,
      });

      const { festivals } = res;

      return createMarkers(festivals);
    },
    ["festivals", JSON.stringify(validated)],
    { tags: ["festivals"] }
  )();
}

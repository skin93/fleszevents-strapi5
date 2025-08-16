import { grafbase } from "../graphql";
import { Festivals } from "../interfaces";
import { ALL_FESTIVALS_QUERY } from "../queries/festivals/allFestivalsQuery";
import { FESTIVAL_BY_SLUG_QUERY } from "../queries/festivals/festivalsByNameQuery";

export async function getAllFestivals(q: string) {
  if (q === undefined) {
    const res = await grafbase.request<Festivals>(ALL_FESTIVALS_QUERY);

    return {
      festivals: res.festivals,
    };
  } else {
    const res = await grafbase.request<Festivals>(FESTIVAL_BY_SLUG_QUERY, {
      slug: q,
    });
    return {
      festivals: res.festivals,
    };
  }
}

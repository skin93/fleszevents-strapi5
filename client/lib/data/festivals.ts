import { grafbase } from "../graphql";
import { Festivals } from "../interfaces";
import { ALL_FESTIVALS_QUERY } from "../queries/festivals/allFestivalsQuery";

export async function getAllFestivals() {
  const res = await grafbase.request<Festivals>(ALL_FESTIVALS_QUERY);
  return {
    festivals: res.festivals,
  };
}

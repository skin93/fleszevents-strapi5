import { grafbase } from "@/lib/graphql";

import { Patronages } from "../interfaces";

import { PATRONAGES_QUERY } from "../queries/patronages/patronagesQuery";

export async function getPatronages() {
  const res = await grafbase.request<Patronages>(PATRONAGES_QUERY);

  return { patronages: res.patronages };
}

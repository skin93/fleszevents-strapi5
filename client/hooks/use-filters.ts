// hooks/use-filters.ts
"use client";

import { useQueryState, createParser } from "nuqs";
import {
  festivalsSearchParamsSchema,
  festivalsSearchParams,
} from "@/lib/validation";

const zodParserForMap = (key: keyof festivalsSearchParams) =>
  createParser({
    parse: (value) => {
      const result = festivalsSearchParamsSchema.shape[key].safeParse(value);
      return result.success ? result.data : "";
    },
    serialize: (value) => value.toString(),
  });

export function useMapFilters() {
  const [city, setCity] = useQueryState(
    "city",
    zodParserForMap("city")
      .withOptions({
        shallow: false,
        history: "push",
      })
      .withDefault("")
  );
  const [fest, setFest] = useQueryState(
    "festival",
    zodParserForMap("festival")
      .withOptions({
        shallow: false,
        history: "push",
      })
      .withDefault("")
  );
  const [genre, setGenre] = useQueryState(
    "genre",
    zodParserForMap("genre")
      .withOptions({
        shallow: false,
        history: "push",
      })
      .withDefault("")
  );

  return {
    filters: { city, fest, genre },
    setCity,
    setFest,
    setGenre,
  };
}

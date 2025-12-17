// hooks/use-filters.ts
"use client";

import { useQueryState, createParser } from "nuqs";
import {
  festivalsSearchParamsSchema,
  type festivalsSearchParams,
} from "@/lib/validation";

const zodParser = (key: keyof festivalsSearchParams) =>
  createParser({
    parse: (value) => {
      const result = festivalsSearchParamsSchema.shape[key].safeParse(value);
      return result.success ? result.data : "";
    },
    serialize: (value) => value.toString(),
  });

export function useFilters() {
  const [city, setCity] = useQueryState(
    "city",
    zodParser("city").withDefault("")
  );
  const [fest, setFest] = useQueryState(
    "festival",
    zodParser("festival").withDefault("")
  );
  const [genre, setGenre] = useQueryState(
    "genre",
    zodParser("genre").withDefault("")
  );

  return {
    filters: { city, fest, genre },
    setCity,
    setFest,
    setGenre,
  };
}

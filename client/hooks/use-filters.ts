"use client";

import { useQueryState, createParser } from "nuqs";
import {
  festivalsSearchParamsSchema,
  festivalsSearchParams,
  calendarSearchParams,
  calendarSearchParamsSchema,
} from "@/lib/validation";
import { format, parseISO } from "date-fns";

const zodParserForMap = (key: keyof festivalsSearchParams) =>
  createParser({
    parse: (value) => {
      const result = festivalsSearchParamsSchema.shape[key].safeParse(value);
      return result.success ? result.data : "";
    },
    serialize: (value) => value.toString(),
  });

export function useMapFilters() {
  const [region, setRegion] = useQueryState(
    "region",
    zodParserForMap("region")
      .withOptions({
        shallow: false,
        history: "push",
      })
      .withDefault("")
  );
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
    filters: { region, city, fest, genre },
    setRegion,
    setCity,
    setFest,
    setGenre,
  };
}

const zodParserForCalendar = (key: keyof calendarSearchParams) =>
  createParser({
    parse: (value) => {
      const result = calendarSearchParamsSchema.shape[key].safeParse(value);
      return result.success ? result.data : "";
    },
    serialize: (value) => value.toString(),
  });

const dateParser = createParser({
  parse: (value) => parseISO(value),
  serialize: (value) => format(value, "yyyy-MM-dd"),
});

export function useCalendarFilters() {
  const [region, setRegion] = useQueryState(
    "region",
    zodParserForCalendar("region")
      .withOptions({
        shallow: false,
        history: "push",
      })
      .withDefault("")
  );

  const [city, setCity] = useQueryState(
    "city",
    zodParserForCalendar("city")
      .withOptions({
        shallow: false,
        history: "push",
      })
      .withDefault("")
  );
  const [location, setLocation] = useQueryState(
    "location",
    zodParserForCalendar("location")
      .withOptions({
        shallow: false,
        history: "push",
      })
      .withDefault("")
  );
  const [type, setType] = useQueryState(
    "type",
    zodParserForCalendar("type")
      .withOptions({
        shallow: false,
        history: "push",
      })
      .withDefault("")
  );

  const [date, setDate] = useQueryState(
    "date",
    dateParser
      .withOptions({ shallow: false, history: "push", clearOnDefault: true })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .withDefault(null as any) // Domyślnie brak wybranej daty
  );

  return {
    filters: { region, city, location, date, type },
    setRegion,
    setCity,
    setLocation,
    setDate,
    setType,
  };
}

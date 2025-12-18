import { format } from "date-fns";
import { grafbase } from "../graphql";
import { Events } from "../interfaces";
import { UPCOMING_EVENTS_QUERY } from "../queries/events/upcomingEventsQuery";
import { calendarSearchParamsSchema } from "../validation";
import { unstable_cache } from "next/cache";
import { ALL_DATES_QUERY } from "../queries/events/allDatesQuery";

export const getCachedEvents = async (rawParams: {
  city: string;
  location: string;
  date: Date | null;
}) => {
  const validated = calendarSearchParamsSchema.parse(rawParams);

  const now = format(new Date(), "yyyy-MM-dd");

  const dateFilter =
    validated.date === null
      ? { gte: now }
      : { eq: format(validated.date, "yyyy-MM-dd") };

  return unstable_cache(
    async () => {
      const res = await grafbase.request<Events>(UPCOMING_EVENTS_QUERY, {
        dateFilter: dateFilter,
        city: validated.city || undefined,
        location: validated.location || undefined,
      });
      return res.events;
    },
    ["events", JSON.stringify(validated)],
    { tags: ["events"] }
  )();
};

export const getCachedBookedDays = async () => {
  return unstable_cache(
    async () => {
      try {
        const res = await grafbase.request<{ events: { date: string }[] }>(
          ALL_DATES_QUERY
        );

        return res.events.map((e) => e.date);
      } catch (error) {
        console.error("Błąd pobierania wszystkich dat", error);
        return [];
      }
    },
    ["booked-days-global"],
    {
      tags: ["events"],
    }
  )();
};

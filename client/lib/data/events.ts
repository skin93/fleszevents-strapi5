import { format } from "date-fns";
import { grafbase } from "../graphql";
import { Event, Events, Place } from "../interfaces";
import { UPCOMING_EVENTS_QUERY } from "../queries/events/upcomingEventsQuery";
import { calendarSearchParamsSchema } from "../validation";
import { ALL_DATES_QUERY } from "../queries/events/allDatesQuery";

type Props = {
  rawParams: Pick<Place, "city" | "location" | "region"> &
    Pick<Event, "type"> & { date: Date | null };
};

export const getEvents = async ({ rawParams }: Props) => {
  const validated = calendarSearchParamsSchema.parse(rawParams);

  const now = format(new Date(), "yyyy-MM-dd");

  const dateFilter =
    validated.date === null
      ? { gte: now }
      : { eq: format(validated.date, "yyyy-MM-dd") };
  try {
    const res = await grafbase.request<Events>(UPCOMING_EVENTS_QUERY, {
      dateFilter: dateFilter,
      city: validated.city || undefined,
      location: validated.location || undefined,
      type: validated.type || undefined,
      region: validated.region || undefined,
    });
    console.log(validated.date);
    return res.events;
  } catch (error) {
    console.error("Błąd pobierania wszystkich wydarzeń...", error);
    return [];
  }
};

export const getBookedDays = async () => {
  try {
    const res = await grafbase.request<{ events: { date: string }[] }>(
      ALL_DATES_QUERY,
      {
        date: format(new Date(), "yyyy-MM-dd"),
      }
    );
    return res.events.map((e) => e.date);
  } catch (error) {
    console.error("Błąd pobierania wszystkich dat...", error);
    return [];
  }
};

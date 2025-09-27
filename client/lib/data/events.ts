import { format } from "date-fns";
import { grafbase } from "../graphql";
import { Events } from "../interfaces";
import { UPCOMING_EVENTS_AT_MONTH_QUERY } from "../queries/events/upcomingEventsAtMonthQuery";
import { UPCOMING_EVENTS_QUERY } from "../queries/events/upcomingEventsQuery";

export async function getUpcomingEvents() {
  const today = format(new Date(), "yyyy-MM-dd");
  const res = await grafbase.request<Events>(UPCOMING_EVENTS_QUERY, {
    today,
  });
  return {
    events: res.events,
  };
}

export async function getUpcomingEventsAtMonth(year: number, month: number) {
  const today = format(new Date(), "yyyy-MM-dd");
  const firstDayOfMonth = format(new Date(year, month), "yyyy-MM-dd");
  const lastDayOfMonth = format(new Date(year, month + 1, 0), "yyyy-MM-dd");
  console.log(today, firstDayOfMonth, lastDayOfMonth);
  const res = await grafbase.request<Events>(UPCOMING_EVENTS_AT_MONTH_QUERY, {
    today,
    firstDayOfMonth,
    lastDayOfMonth,
  });
  return {
    events: res.events,
  };
}

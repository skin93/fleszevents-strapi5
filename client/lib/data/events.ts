import { grafbase } from "../graphql";
import { Events } from "../interfaces";
import { ALL_EVENTS_QUERY } from "../queries/events/allEventsQuery";

export async function getAllEvents() {
  const res = await grafbase.request<Events>(ALL_EVENTS_QUERY);
  return {
    events: res.events,
  };
}

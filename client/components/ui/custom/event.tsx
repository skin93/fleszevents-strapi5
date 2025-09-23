import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { Event as CalendarEvent } from "@/lib/interfaces";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";

type Props = {
  event: CalendarEvent;
};

export function Event({ event }: Props) {
  const outdated =
    format(event.date, "yyyy/MM/dd") < format(new Date(), "yyyy/MM/dd");
  return (
    <>
      <Link
        className="group border-none relative shadow-none translate-y-0  hover:-translate-y-2 transition-all duration-300"
        href={`/articles/${event.article?.slug}`}
      >
        <h3
          className={cn(
            "dark:no-underline dark:group-hover:text-teal-400 group-hover:underline transition-all duration-300 px-4 pl-0",
            outdated ? "text-muted-foreground/30" : "text-foreground"
          )}
        >
          {event.name}
        </h3>

        {event?.endDate ? (
          <p className="text-foreground">
            {format(event.date, "dd MMMM yyy", { locale: pl })} -{" "}
            {format(event.endDate, "dd MMMM yyy", { locale: pl })}
          </p>
        ) : (
          <p className="text-foreground">
            {format(event.date, "dd MMMM yyy", { locale: pl })}
          </p>
        )}
        <p>
          {event?.place?.city} - {event?.place?.location}
        </p>
        <hr />
      </Link>
    </>
  );
}

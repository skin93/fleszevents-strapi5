import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { Event as CalendarEvent } from "@/lib/interfaces";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";

type Props = {
  event: CalendarEvent;
  index: number;
};

export function Event({ event, index }: Props) {
  const outdated =
    format(event.date, "yyyy/MM/dd") < format(new Date(), "yyyy/MM/dd");
  return (
    <>
      <div className="text-sm bg-foreground text-background p-2 absolute top-[-10] left-[-10] translate-[-10] font-extrabold">
        {index + 1}
      </div>
      <Link href={`/articles/${event.article?.slug}`}>
        <div>
          <h3
            className={cn(
              "dark:no-underline dark:group-hover:text-teal-400 group-hover:underline transition-all duration-300 pl-0",
              outdated ? "text-muted-foreground/30" : "text-foreground",
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
        </div>
      </Link>
    </>
  );
}

"use client";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Fragment, useState } from "react";
import { Event } from "@/lib/interfaces";
import { pl } from "date-fns/locale";
import { format } from "date-fns";
import { Event as EventComponent } from "../ui/custom/event";

type Props = {
  events: Event[];
};

export default function CustomCalendar({ events }: Props) {
  const [date, setDate] = useState<Date | undefined>();

  const upcomingEvents = events.filter(
    (event) =>
      format(event.date, "yyyy/MM/dd") > format(new Date(), "yyyy/MM/dd")
  );

  const filteredEvents = date
    ? events.filter(
        (event) =>
          format(event.date, "dd/MM/yyy") === format(date, "dd/MM/yyyy")
      )
    : events;

  const bookedDays = events.map((event) => new Date(event.date));

  return (
    <Fragment>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <Calendar
                locale={pl}
                timeZone="Europe/Berlin"
                mode="single"
                selected={date}
                onSelect={setDate}
                modifiers={{
                  booked: bookedDays,
                }}
                modifiersClassNames={{
                  booked: "my-booked-class",
                }}
                disabled={{ before: new Date() }}
                className="[&_[role=gridcell].bg-primary]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
              />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator className="mx-0" />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        {!date && upcomingEvents.length > 0 ? (
          <div>
            <h1 className="p-4 pl-0">Nadchodzące wydarzenia:</h1>
            <div className="flex flex-col gap-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.documentId}
                  className="group border-none relative shadow-none translate-y-0  hover:-translate-y-2 transition-all duration-300"
                >
                  <EventComponent event={event} />
                </div>
              ))}
            </div>
          </div>
        ) : date && filteredEvents.length > 0 ? (
          <div>
            <h1 className="p-4 pl-0">
              Wydarzenia w dniu{" "}
              {date && format(date, "dd MMMM yyyy", { locale: pl })}:
            </h1>
            <div className="flex flex-col gap-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.documentId}
                  className="group border-none relative shadow-none translate-y-0  hover:-translate-y-2 transition-all duration-300"
                >
                  <EventComponent event={event} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="p-4 pl-0">Brak wydarzeń dla wybranej daty</h1>
        )}
      </SidebarInset>
    </Fragment>
  );
}

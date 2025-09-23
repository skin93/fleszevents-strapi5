"use client";
import {
  SidebarFooter,
  SidebarGroupLabel,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Fragment, useEffect, useState } from "react";
import { Event } from "@/lib/interfaces";
import { pl } from "date-fns/locale";
import { format } from "date-fns";
import { Event as EventComponent } from "../ui/custom/event";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  events: Event[];
};

export default function CustomCalendar({ events }: Props) {
  const [date, setDate] = useState<Date | undefined>();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>(events);
  const [cityValue, setCityValue] = useState<string>("");
  const [cityPopOpen, setCityPopOpen] = useState<boolean>(false);

  useEffect(() => {
    const data = events.filter(
      (event) =>
        format(event.date, "yyyy/MM/dd") > format(new Date(), "yyyy/MM/dd")
    );
    setUpcomingEvents(data);
  }, [events]);

  const filteredEvents = date
    ? events.filter(
        (event) =>
          format(event.date, "dd/MM/yyy") === format(date, "dd/MM/yyyy")
      )
    : events;

  const bookedDays = events.map((event) => new Date(event.date));

  const cities = new Set(events.map((event) => event.place?.city));

  const handleCityChange = (val: string) => {
    setCityValue(val);
    setCityPopOpen(false);
  };

  const handleReset = () => {
    setCityValue("");
    setDate(undefined);
  };

  return (
    <Fragment>
      <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupLabel>Kalendarz</SidebarGroupLabel>
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
          <SidebarGroup className="px-0"></SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Popover open={cityPopOpen} onOpenChange={setCityPopOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={cityPopOpen}
                className="xl:w-[200px] justify-between"
              >
                {cityValue
                  ? [...cities].find((city) => city === cityValue)
                  : "Wybierz miasto..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
              <Command>
                <CommandInput placeholder="Wybierz miasto..." className="h-9" />
                <CommandList className="h-50">
                  <CommandEmpty>Brak miasta</CommandEmpty>
                  <CommandGroup>
                    {[...cities].sort().map((city) => (
                      <CommandItem
                        key={city}
                        value={city}
                        onSelect={(currentValue) => {
                          handleCityChange(currentValue);
                        }}
                      >
                        {city}
                        <Check
                          className={cn(
                            "ml-auto",
                            cityValue === city ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button onClick={handleReset}>Resetuj filtry</Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        {!date && cityValue && upcomingEvents.length > 0 ? (
          <div>
            <h1 className="p-4 pl-0">
              Nadchodzące wydarzenia w mieście: {cityValue}
            </h1>
            <div className="flex flex-col gap-4">
              {upcomingEvents
                .filter((event) => event.place?.city === cityValue)
                .map((event) => (
                  <div
                    key={event.documentId}
                    className="group border-none relative shadow-none translate-y-0  hover:-translate-y-2 transition-all duration-300"
                  >
                    <EventComponent event={event} />
                  </div>
                ))}
            </div>
          </div>
        ) : !date && upcomingEvents.length > 0 ? (
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

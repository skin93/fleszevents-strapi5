"use client";
import {
  SidebarGroupLabel,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/lib/interfaces";
import { pl } from "date-fns/locale";
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
import { useCalendarFilters } from "@/hooks/use-filters";

type Props = {
  events: Event[];
  allBookedDates: string[];
};

export default function CustomCalendar({ events, allBookedDates }: Props) {
  const router = useRouter();

  const {
    filters: { city, location, date, type },
    setCity,
    setLocation,
    setDate,
    setType,
  } = useCalendarFilters();

  const [cityPopOpen, setCityPopOpen] = useState<boolean>(false);
  const [locationPopOpen, setLocationPopOpen] = useState<boolean>(false);
  const [typePopOpen, setTypePopOpen] = useState<boolean>(false);

  const cities = new Set(events.map((event) => event.place?.city));
  const locations = new Set(events.map((event) => event.place?.location));
  const types = new Set(events.map((event) => event.type));

  const booked = allBookedDates.map((date) => new Date(date));

  const handleCityChange = (val: string) => {
    setCity(val);
    setCityPopOpen(false);
  };

  const handleLocationChange = (val: string) => {
    setLocation(val);
    setLocationPopOpen(false);
  };

  const handleTypeChange = (val: string) => {
    setType(val);
    setTypePopOpen(false);
  };

  const handleReset = () => {
    setCity(null);
    setLocation(null);
    setDate(null);
    setType(null);
    router.push("/calendar");
  };

  return (
    <Fragment>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="p-0 mt-[56px]">
            <SidebarGroupContent>
              <Calendar
                locale={pl}
                timeZone="Europe/Berlin"
                mode="single"
                selected={date ?? undefined}
                onSelect={(newDate) => {
                  if (newDate) setDate(newDate);
                }}
                modifiers={{
                  booked: booked,
                }}
                modifiersClassNames={{
                  booked: "my-booked-class",
                }}
                disabled={{ before: new Date() }}
                className="[&_[role=gridcell].bg-primary]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px] "
              />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="p-0 flex flex-col gap-4">
            <SidebarGroupLabel>Filtry</SidebarGroupLabel>
            <Popover open={cityPopOpen} onOpenChange={setCityPopOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={cityPopOpen}
                  className="xl:w-[200px] justify-between"
                >
                  {String(city) || "Miejscowość"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                <Command>
                  <CommandInput placeholder="Wybierz miejscowość..." />
                  <CommandList className="h-50">
                    <CommandEmpty>Brak miasta</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value={"Wszystko"}
                        onSelect={() => {
                          handleCityChange("");
                        }}
                      >
                        {"Wszystko"}
                      </CommandItem>
                      {[...cities].sort().map((val) => (
                        <CommandItem
                          key={val}
                          value={val}
                          onSelect={(currentValue) => {
                            handleCityChange(currentValue);
                          }}
                        >
                          {val}
                          <Check
                            className={cn(
                              "ml-auto",
                              city === val ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Popover open={locationPopOpen} onOpenChange={setLocationPopOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={cityPopOpen}
                  className="xl:w-[200px] justify-between"
                >
                  {String(location) || "Miejsce"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                <Command>
                  <CommandInput placeholder="Wybierz miejsce..." />
                  <CommandList className="h-50">
                    <CommandEmpty>Brak miejsca</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value={"Wszystko"}
                        onSelect={() => {
                          handleLocationChange("");
                        }}
                      >
                        {"Wszystko"}
                      </CommandItem>
                      {[...locations].sort().map((val) => (
                        <CommandItem
                          key={val}
                          value={val}
                          onSelect={(currentValue) => {
                            handleLocationChange(currentValue);
                          }}
                        >
                          {val}
                          <Check
                            className={cn(
                              "ml-auto",
                              location === val ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Popover open={typePopOpen} onOpenChange={setTypePopOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={cityPopOpen}
                  className="xl:w-[200px] justify-between"
                >
                  {String(type) || "Typ"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                <Command>
                  <CommandInput placeholder="Wybierz typ eventu..." />
                  <CommandList className="h-50">
                    <CommandEmpty>Brak typu</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value={"Wszystko"}
                        onSelect={() => {
                          handleTypeChange("");
                        }}
                      >
                        {"Wszystko"}
                      </CommandItem>
                      {[...types].sort().map((val) => (
                        <CommandItem
                          key={val}
                          value={val as string}
                          onSelect={(currentValue) => {
                            handleTypeChange(currentValue);
                          }}
                        >
                          {val}
                          <Check
                            className={cn(
                              "ml-auto",
                              type === val ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button className="w-fit" onClick={handleReset}>
              Resetuj filtry
            </Button>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        {city && events.length > 0 ? (
          <div>
            <h1 className="p-4 pl-0">
              Nadchodzące wydarzenia w: {String(city)}
            </h1>
            <div className="flex flex-col gap-4">
              {events
                .filter((event) => event.place?.city === city)
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
        ) : location && events.length > 0 ? (
          <div>
            <h1 className="p-4 pl-0">
              Nadchodzące wydarzenia w: {String(location)}
            </h1>
            <div className="flex flex-col gap-4">
              {events
                .filter((event) => event.place?.location === location)
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
        ) : events.length > 0 ? (
          <div>
            <h1 className="p-4 pl-0">Nadchodzące wydarzenia:</h1>
            <div className="flex flex-col gap-4">
              {events.map((event) => (
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

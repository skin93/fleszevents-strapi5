"use client";

import { Calendar } from "@/components/ui/calendar";
import { Fragment, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/lib/interfaces";
import { pl } from "date-fns/locale";
import { formatDateToLocal } from "@/lib/utils";

import { Event as EventComponent } from "../ui/custom/event";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Check, Home, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarFilters } from "@/hooks/use-filters";
import { debounce } from "nuqs";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerDescription,
  DrawerContent,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Input } from "../ui/input";

type Props = {
  events: Event[];
  allBookedDates: string[];
};

export default function CustomCalendar({ events, allBookedDates }: Props) {
  const router = useRouter();

  const {
    filters: { region, city, location, date, type, term },
    setRegion,
    setCity,
    setLocation,
    setDate,
    setType,
    setTerm,
  } = useCalendarFilters();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [filterSearch, setFilterSearch] = useState({
    region: "",
    city: "",
    location: "",
    type: "",
  });

  const handleSearchChange = (
    key: keyof typeof filterSearch,
    value: string,
  ) => {
    setFilterSearch((prev) => ({ ...prev, [key]: value }));
  };

  const { regions, cities, locations, types } = useMemo(() => {
    const regSet = new Set<string>();
    const citySet = new Set<string>();
    const locSet = new Set<string>();
    const typeSet = new Set<string>();

    events.forEach((event) => {
      if (event.place?.region) regSet.add(event.place.region);
      if (event.place?.city) citySet.add(event.place.city);
      if (event.place?.location) locSet.add(event.place.location);
      if (event.type) typeSet.add(event.type);
    });

    return {
      regions: Array.from(regSet).sort(),
      cities: Array.from(citySet).sort(),
      locations: Array.from(locSet).sort(),
      types: Array.from(typeSet).sort(),
    };
  }, [events]);

  const booked = useMemo(() => {
    return allBookedDates.map((d) => new Date(d));
  }, [allBookedDates]);

  const filteredEvents = useMemo(() => {
    if (city) return events.filter((e) => e.place?.city === city);
    if (location) return events.filter((e) => e.place?.location === location);
    if (region) return events.filter((e) => e.place?.region === region);
    return events;
  }, [events, city, location, region]);

  const handleRegionChange = (val: string) => setRegion(val);
  const handleCityChange = (val: string) => setCity(val);
  const handleLocationChange = (val: string) => setLocation(val);
  const handleTypeChange = (val: string) => setType(val);

  const handleTermChange = (val: string) => {
    setTerm(val, { limitUrlUpdates: val === "" ? undefined : debounce(500) });
  };

  const handleReset = () => {
    setCity(null);
    setLocation(null);
    setDate(null);
    setType(null);
    setRegion(null);
    setTerm(null);
    setFilterSearch({ region: "", city: "", location: "", type: "" });
    setDrawerOpen(false);
    router.push("/calendar");
  };
  const renderFilterForm = () => {
    const filteredRegions = regions.filter((r) =>
      r.toLowerCase().includes(filterSearch.region.toLowerCase()),
    );
    const filteredCities = cities.filter((c) =>
      c.toLowerCase().includes(filterSearch.city.toLowerCase()),
    );
    const filteredLocations = locations.filter((l) =>
      l.toLowerCase().includes(filterSearch.location.toLowerCase()),
    );
    const filteredTypes = types.filter((t) =>
      t.toLowerCase().includes(filterSearch.type.toLowerCase()),
    );

    return (
      <div className="flex flex-col gap-3 pb-2">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold tracking-tight">Filtry</h2>
          <p className="text-xs text-muted-foreground">
            Dostosuj wyniki wyszukiwania
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Szukaj frazy..."
            value={(term as string) ?? ""}
            onChange={(e) => handleTermChange(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="calendar" className="border-b-0">
            <AccordionTrigger className="py-2 text-xs font-medium hover:no-underline cursor-pointer">
              {date ? formatDateToLocal(date.toString()) : "Wybierz datę"}
            </AccordionTrigger>
            <AccordionContent className="flex justify-center pt-1 pb-2">
              <Calendar
                locale={pl}
                timeZone="Europe/Berlin"
                mode="single"
                selected={date ?? undefined}
                onSelect={(newDate) => {
                  if (newDate) setDate(newDate);
                }}
                modifiers={{ booked }}
                modifiersClassNames={{ booked: "my-booked-class" }}
                disabled={{ before: new Date() }}
                className="rounded-md border bg-card scale-90 origin-top"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="region">
            <AccordionTrigger className="py-2 text-xs font-medium hover:no-underline cursor-pointer">
              {region ? `Województwo: ${region}` : "Województwo"}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1.5 pt-1">
              <Input
                type="text"
                placeholder="Filtruj województwa..."
                value={filterSearch.region}
                onChange={(e) => handleSearchChange("region", e.target.value)}
                className="w-full px-2.5 py-1 text-xs rounded-md border border-input bg-background"
              />
              <div className="max-h-40 overflow-y-auto flex flex-col gap-0.5 pr-1">
                <button
                  type="button"
                  onClick={() => handleRegionChange("")}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-1 text-xs rounded-md text-left transition-colors hover:bg-accent",
                    !region && "bg-accent font-medium",
                  )}
                >
                  Wszystko
                  {!region && <Check className="h-3.5 w-3.5" />}
                </button>
                {filteredRegions.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleRegionChange(val)}
                    className={cn(
                      "flex items-center justify-between w-full px-2 py-1 text-xs rounded-md text-left transition-colors hover:bg-accent",
                      region === val && "bg-accent font-medium",
                    )}
                  >
                    {val}
                    {region === val && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="city">
            <AccordionTrigger className="py-2 text-xs font-medium hover:no-underline cursor-pointer">
              {city ? `Miejscowość: ${city}` : "Miejscowość"}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1.5 pt-1">
              <Input
                type="text"
                placeholder="Filtruj miejscowości..."
                value={filterSearch.city}
                onChange={(e) => handleSearchChange("city", e.target.value)}
                className="w-full px-2.5 py-1 text-xs rounded-md border border-input bg-background"
              />
              <div className="max-h-40 overflow-y-auto flex flex-col gap-0.5 pr-1">
                <button
                  type="button"
                  onClick={() => handleCityChange("")}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-1 text-xs rounded-md text-left transition-colors hover:bg-accent",
                    !city && "bg-accent font-medium",
                  )}
                >
                  Wszystko
                  {!city && <Check className="h-3.5 w-3.5" />}
                </button>
                {filteredCities.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleCityChange(val)}
                    className={cn(
                      "flex items-center justify-between w-full px-2 py-1 text-xs rounded-md text-left transition-colors hover:bg-accent",
                      city === val && "bg-accent font-medium",
                    )}
                  >
                    {val}
                    {city === val && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="location">
            <AccordionTrigger className="py-2 text-xs font-medium hover:no-underline cursor-pointer">
              {location ? `Miejsce: ${location}` : "Miejsce"}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1.5 pt-1">
              <Input
                type="text"
                placeholder="Filtruj miejsca..."
                value={filterSearch.location}
                onChange={(e) => handleSearchChange("location", e.target.value)}
                className="w-full px-2.5 py-1 text-xs rounded-md border border-input bg-background"
              />
              <div className="max-h-40 overflow-y-auto flex flex-col gap-0.5 pr-1">
                <button
                  type="button"
                  onClick={() => handleLocationChange("")}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-1 text-xs rounded-md text-left transition-colors hover:bg-accent",
                    !location && "bg-accent font-medium",
                  )}
                >
                  Wszystko
                  {!location && <Check className="h-3.5 w-3.5" />}
                </button>
                {filteredLocations.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleLocationChange(val)}
                    className={cn(
                      "flex items-center justify-between w-full px-2 py-1 text-xs rounded-md text-left transition-colors hover:bg-accent",
                      location === val && "bg-accent font-medium",
                    )}
                  >
                    {val}
                    {location === val && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="type">
            <AccordionTrigger className="py-2 text-xs font-medium hover:no-underline cursor-pointer">
              {type ? `Typ: ${type}` : "Typ"}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1.5 pt-1">
              <Input
                type="text"
                placeholder="Filtruj typy..."
                value={filterSearch.type}
                onChange={(e) => handleSearchChange("type", e.target.value)}
                className="w-full px-2.5 py-1 text-xs rounded-md border border-input bg-background"
              />
              <div className="max-h-40 overflow-y-auto flex flex-col gap-0.5 pr-1">
                <button
                  type="button"
                  onClick={() => handleTypeChange("")}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-1 text-xs rounded-md text-left transition-colors hover:bg-accent",
                    !type && "bg-accent font-medium",
                  )}
                >
                  Wszystko
                  {!type && <Check className="h-3.5 w-3.5" />}
                </button>
                {filteredTypes.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleTypeChange(val)}
                    className={cn(
                      "flex items-center justify-between w-full px-2 py-1 text-xs rounded-md text-left transition-colors hover:bg-accent",
                      type === val && "bg-accent font-medium",
                    )}
                  >
                    {val}
                    {type === val && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          size="sm"
          className="w-full mt-1 h-8 text-xs"
          onClick={handleReset}
        >
          Resetuj filtry
        </Button>
      </div>
    );
  };

  const filterTitle = city
    ? `Nadchodzące wydarzenia w: ${city}`
    : location
      ? `Nadchodzące wydarzenia w: ${location}`
      : region
        ? `Nadchodzące wydarzenia w: ${region}`
        : "Nadchodzące wydarzenia:";

  return (
    <Fragment>
      <div className="my-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <Home />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>KALENDARZ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid md:grid-cols-[30%_60%] md:justify-around items-start">
        <div
          aria-label="filters-desktop"
          className="hidden md:flex md:flex-col md:flex-1/4 sticky top-[112px] border border-black/10 bg-white dark:border-white/5 dark:bg-card rounded-sm shadow-md m-4 p-4"
        >
          {renderFilterForm()}
        </div>
        <div
          aria-label="filters-mobile"
          className="md:hidden flex flex-col my-4 sticky top-[112px] z-10 bg-background/95 backdrop-blur py-2"
        >
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            direction="left"
          >
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full shadow-sm">
                Filtruj
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-[320px] p-6 overflow-y-auto">
              <DrawerHeader className="sr-only">
                <DrawerTitle className="sr-only">Filtry</DrawerTitle>
                <DrawerDescription className="sr-only">
                  Dostosuj wyniki wyszukiwania
                </DrawerDescription>
              </DrawerHeader>
              {renderFilterForm()}
            </DrawerContent>
          </Drawer>
        </div>

        <div aria-label="results" className="flex flex-col">
          {filteredEvents.length > 0 ? (
            <div>
              <h1 className="p-4 pl-0 text-xl font-bold">{filterTitle}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredEvents.map((event, index) => (
                  <div
                    key={event.documentId}
                    className="group border-none relative shadow-md bg-card rounded-sm p-4"
                  >
                    <EventComponent index={index} event={event} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1 className="p-4 pl-0 text-xl">Brak wydarzeń</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
}

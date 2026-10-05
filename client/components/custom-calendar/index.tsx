"use client";
import { Calendar } from "@/components/ui/calendar";
import { Fragment, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/lib/interfaces";
import { pl } from "date-fns/locale";
import { formatDateToLocal } from "@/lib/utils";

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
import { Check, ChevronsUpDown, Home, ChevronDownIcon } from "lucide-react";
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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

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

  const [regionPopOpen, setRegionPopOpen] = useState<boolean>(false);
  const [cityPopOpen, setCityPopOpen] = useState<boolean>(false);
  const [locationPopOpen, setLocationPopOpen] = useState<boolean>(false);
  const [typePopOpen, setTypePopOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // OPTYMALIZACJA 1: Zapamiętywanie unikalnych wartości filtrów (useMemo)
  // Przeliczanie wykona się tylko wtedy, gdy zmieni się tablica `events`
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

  // OPTYMALIZACJA 2: Zapamiętywanie wygenerowanych obiektów Date
  const booked = useMemo(() => {
    return allBookedDates.map((d) => new Date(d));
  }, [allBookedDates]);

  // OPTYMALIZACJA 3: Przefiltrowanie listy wydarzeń przed renderowaniem JSX
  const filteredEvents = useMemo(() => {
    if (city) return events.filter((e) => e.place?.city === city);
    if (location) return events.filter((e) => e.place?.location === location);
    if (region) return events.filter((e) => e.place?.region === region);
    return events;
  }, [events, city, location, region]);

  const handleRegionChange = (val: string) => {
    setRegion(val);
    setRegionPopOpen(false);
  };

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
    setDrawerOpen(false);
    router.push("/calendar");
  };

  // Sekcja filtrów przeniesiona do osobnej funkcji pod kątem ponownego użycia
  const renderFilterForm = () => (
    <div className="flex flex-col gap-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            data-empty={!date}
            className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {date ? formatDateToLocal(date.toString()) : "Wybierz datę"}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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
            className="[&_[role=gridcell].bg-primary]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-fit bg-card h-[330px]"
          />
        </PopoverContent>
      </Popover>

      <Command className="w-full h-auto">
        <CommandInput
          placeholder="Szukaj frazy..."
          value={(term as string) ?? ""}
          onValueChange={handleTermChange}
        />
      </Command>

      {/* Województwo */}
      <Popover open={regionPopOpen} onOpenChange={setRegionPopOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={regionPopOpen}
            className="w-full justify-between"
          >
            {region ? String(region) : "Województwo"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 pointer-events-auto">
          <Command>
            <CommandInput placeholder="Wybierz województwo..." />
            <CommandList className="h-50">
              <CommandEmpty>Brak województwa</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="Wszystko"
                  onSelect={() => handleRegionChange("")}
                >
                  Wszystko
                </CommandItem>
                {regions.map((val) => (
                  <CommandItem
                    key={val}
                    value={val}
                    onSelect={handleRegionChange}
                  >
                    {val}
                    <Check
                      className={cn(
                        "ml-auto",
                        region === val ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Miejscowość */}
      <Popover open={cityPopOpen} onOpenChange={setCityPopOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={cityPopOpen}
            className="w-full justify-between"
          >
            {city ? String(city) : "Miejscowość"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 pointer-events-auto">
          <Command>
            <CommandInput placeholder="Wybierz miejscowość..." />
            <CommandList className="h-50">
              <CommandEmpty>Brak miasta</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="Wszystko"
                  onSelect={() => handleCityChange("")}
                >
                  Wszystko
                </CommandItem>
                {cities.map((val) => (
                  <CommandItem
                    key={val}
                    value={val}
                    onSelect={handleCityChange}
                  >
                    {val}
                    <Check
                      className={cn(
                        "ml-auto",
                        city === val ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Miejsce */}
      <Popover open={locationPopOpen} onOpenChange={setLocationPopOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={locationPopOpen}
            className="w-full justify-between"
          >
            {location ? String(location) : "Miejsce"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 pointer-events-auto">
          <Command>
            <CommandInput placeholder="Wybierz miejsce..." />
            <CommandList className="h-50">
              <CommandEmpty>Brak miejsca</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="Wszystko"
                  onSelect={() => handleLocationChange("")}
                >
                  Wszystko
                </CommandItem>
                {locations.map((val) => (
                  <CommandItem
                    key={val}
                    value={val}
                    onSelect={handleLocationChange}
                  >
                    {val}
                    <Check
                      className={cn(
                        "ml-auto",
                        location === val ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Typ */}
      <Popover open={typePopOpen} onOpenChange={setTypePopOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={typePopOpen}
            className="w-full justify-between"
          >
            {type ? String(type) : "Typ"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 pointer-events-auto">
          <Command>
            <CommandInput placeholder="Wybierz typ eventu..." />
            <CommandList className="h-50">
              <CommandEmpty>Brak typu</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="Wszystko"
                  onSelect={() => handleTypeChange("")}
                >
                  Wszystko
                </CommandItem>
                {types.map((val) => (
                  <CommandItem
                    key={val}
                    value={val}
                    onSelect={handleTypeChange}
                  >
                    {val}
                    <Check
                      className={cn(
                        "ml-auto",
                        type === val ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button className="w-full" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );

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
        {/* Filtry - Wersja Desktop (Usunięto rozmycie backdrop-blur ze względu na wydajność) */}
        <div
          aria-label="filters-desktop"
          className="hidden md:flex md:flex-col md:flex-1/4 gap-6 sticky top-[112px] border border-black/10 bg-white dark:border-white/5 dark:bg-card rounded-sm shadow-md m-4 p-4"
        >
          {renderFilterForm()}
        </div>

        {/* Filtry - Wersja Mobile */}
        <div
          aria-label="filters-mobile"
          className="md:hidden flex flex-col my-4"
        >
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            direction="left"
          >
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full">
                Filtruj
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-[300px] p-6 overflow-y-auto">
              <DrawerHeader className="text-left px-0 pt-0">
                <DrawerTitle>Filtry</DrawerTitle>
                <DrawerDescription>
                  Dostosuj wyniki wyszukiwania
                </DrawerDescription>
              </DrawerHeader>
              {renderFilterForm()}
            </DrawerContent>
          </Drawer>
        </div>

        {/* Wyniki Wyszukiwania */}
        <div aria-label="results" className="flex flex-col">
          {filteredEvents.length > 0 ? (
            <div>
              <h1 className="p-4 pl-0 text-xl font-bold">{filterTitle}</h1>
              <div className="flex flex-col gap-6">
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

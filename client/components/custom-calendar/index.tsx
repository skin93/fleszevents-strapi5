"use client";
import { Calendar } from "@/components/ui/calendar";
import { Fragment, useState } from "react";
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
import { Check, ChevronsUpDown, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarFilters } from "@/hooks/use-filters";
import { debounce } from "nuqs";

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

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

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

  const regions = new Set(events.map((event) => event.place?.region));
  const cities = new Set(events.map((event) => event.place?.city));
  const locations = new Set(events.map((event) => event.place?.location));
  const types = new Set(events.map((event) => event.type));

  const booked = allBookedDates.map((date) => new Date(date));

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
          className="hidden md:flex md:flex-col md:flex-1/4 gap-6 sticky top-[112px] border border-black/10 bg-white/85 dark:border-white/5 dark:bg-[var(--color-foreground)]/5  backdrop-blur-md rounded-sm shadow-md m-4 p-4"
        >
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
                modifiers={{
                  booked: booked,
                }}
                modifiersClassNames={{
                  booked: "my-booked-class",
                }}
                disabled={{ before: new Date() }}
                className="[&_[role=gridcell].bg-primary]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-fit bg-card h-[330px]"
              />
            </PopoverContent>
          </Popover>
          <Command className="w-full h-auto">
            <CommandInput
              placeholder="Szukaj frazy..."
              value={term as string}
              onValueChange={(val) => {
                handleTermChange(val);
              }}
            />
          </Command>
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
                      value={"Wszystko"}
                      onSelect={() => {
                        handleRegionChange("");
                      }}
                    >
                      {"Wszystko"}
                    </CommandItem>
                    {[...regions].sort().map(
                      (val) =>
                        val && (
                          <CommandItem
                            key={val}
                            value={val}
                            onSelect={(currentValue) => {
                              handleRegionChange(currentValue);
                            }}
                          >
                            {val}
                            <Check
                              className={cn(
                                "ml-auto",
                                region === val ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ),
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
          <Popover open={locationPopOpen} onOpenChange={setLocationPopOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={cityPopOpen}
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
          <Popover open={typePopOpen} onOpenChange={setTypePopOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={cityPopOpen}
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
          <Button className="w-fit" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <div
          aria-label="filters-mobile"
          className="md:hidden flex flex-col sticky top-[112px] z-100"
        >
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            direction="left"
          >
            <DrawerTrigger asChild>
              <Button variant={"outline"}>Filtruj</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="hidden">
                <DrawerTitle>Filtry</DrawerTitle>
                <DrawerDescription>Lista filtrów</DrawerDescription>
              </DrawerHeader>

              <div
                aria-label="filters"
                className="lg:hidden flex flex-col gap-6"
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      data-empty={!date}
                      className="w-[200px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {date
                        ? formatDateToLocal(date.toString())
                        : "Wybierz datę"}
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
                      modifiers={{
                        booked: booked,
                      }}
                      modifiersClassNames={{
                        booked: "my-booked-class",
                      }}
                      disabled={{ before: new Date() }}
                      className="[&_[role=gridcell].bg-primary]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-fit bg-card h-[330px]"
                    />
                  </PopoverContent>
                </Popover>
                <Command className="w-[200px] h-auto">
                  <CommandInput
                    placeholder="Szukaj frazy..."
                    value={term as string}
                    onValueChange={(val) => {
                      handleTermChange(val);
                    }}
                  />
                </Command>
                <Popover onOpenChange={setRegionPopOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={regionPopOpen}
                      className="w-[200px] justify-between"
                    >
                      {region ? String(region) : "Województwo"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0 pointer-events-auto">
                    <Command>
                      <CommandInput placeholder="Wybierz województwo..." />
                      <CommandList className="h-50">
                        <CommandEmpty>Brak województwa</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value={"Wszystko"}
                            onSelect={() => {
                              handleRegionChange("");
                            }}
                          >
                            {"Wszystko"}
                          </CommandItem>
                          {[...regions].sort().map(
                            (val) =>
                              val && (
                                <CommandItem
                                  key={val}
                                  value={val}
                                  onSelect={(currentValue) => {
                                    handleRegionChange(currentValue);
                                  }}
                                >
                                  {val}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      region === val
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ),
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Popover onOpenChange={setCityPopOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={cityPopOpen}
                      className="w-[200px] justify-between"
                    >
                      {city ? String(city) : "Miejscowość"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0 pointer-events-auto">
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
                <Popover onOpenChange={setLocationPopOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={cityPopOpen}
                      className="w-[200px] justify-between"
                    >
                      {location ? String(location) : "Miejsce"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0 pointer-events-auto">
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
                                  location === val
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={cityPopOpen}
                      className="w-[200px] justify-between"
                    >
                      {type ? String(type) : "Typ"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0 pointer-events-auto">
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
                <Button className="w-fit" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div aria-label="results" className="flex flex-col">
          {city && events.length > 0 ? (
            <div>
              <h1 className="p-4 pl-0">
                Nadchodzące wydarzenia w: {String(city)}
              </h1>
              <div className="flex flex-col gap-6">
                {events
                  .filter((event) => event.place?.city === city)
                  .map((event, index) => (
                    <div
                      key={event.documentId}
                      className="group border-none relative shadow-md translate-y-0  hover:-translate-y-2 transition-all duration-300 bg-card rounded-sm p-4"
                    >
                      <EventComponent index={index} event={event} />
                    </div>
                  ))}
              </div>
            </div>
          ) : location && events.length > 0 ? (
            <div>
              <h1 className="p-4 pl-0">
                Nadchodzące wydarzenia w: {String(location)}
              </h1>
              <div className="flex flex-col gap-6">
                {events
                  .filter((event) => event.place?.location === location)
                  .map((event, index) => (
                    <div
                      key={event.documentId}
                      className="group border-none relative shadow-md translate-y-0  hover:-translate-y-2 transition-all duration-300 bg-card rounded-sm p-4"
                    >
                      <EventComponent index={index} event={event} />
                    </div>
                  ))}
              </div>
            </div>
          ) : region && events.length > 0 ? (
            <div>
              <h1 className="p-4 pl-0">
                Nadchodzące wydarzenia w: {String(region)}
              </h1>
              <div className="flex flex-col gap-6">
                {events
                  .filter((event) => event.place?.region === region)
                  .map((event, index) => (
                    <div
                      key={event.documentId}
                      className="group border-none relative shadow-md translate-y-0  hover:-translate-y-2 transition-all duration-300 bg-card rounded-sm p-4"
                    >
                      <EventComponent index={index} event={event} />
                    </div>
                  ))}
              </div>
            </div>
          ) : events.length > 0 ? (
            <div>
              <h1 className="p-4 pl-0">Nadchodzące wydarzenia:</h1>
              <div className="flex flex-col gap-6">
                {events.map((event, index) => (
                  <div
                    key={event.documentId}
                    className="group border-none relative shadow-md translate-y-0  hover:-translate-y-2 transition-all duration-300 bg-card rounded-sm p-4"
                  >
                    <EventComponent index={index} event={event} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1 className="p-4 pl-0">Brak wydarzeń</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import L, { Icon, LatLngExpression } from "leaflet";
import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";
import { cn, formatDateToLocal } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Marker as MarkerType } from "@/lib/interfaces";

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
import { MapLibreTileLayer } from "./map-libre-tile-layer";
import { Check, ChevronsUpDown } from "lucide-react";
import isValidUrl from "@/lib/isValidUrl";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { useMapFilters } from "@/hooks/use-filters";

export default function Map({ markers }: { markers: MarkerType[] }) {
  const router = useRouter();
  const center = [51.974077, 19.451946];
  const zoom = 6;

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (markers.length === 1) {
      map.setView(markers[0].position, 8, { animate: true });
    } else {
      map.setView([51.974077, 19.451946], zoom, { animate: true });
    }
  }, [markers]);
  const {
    filters: { city, fest, genre },
    setCity,
    setFest,
    setGenre,
  } = useMapFilters();
  const [cityPopOpen, setCityPopOpen] = useState<boolean>(false);
  const [festPopOpen, setFestPopOpen] = useState<boolean>(false);
  const [genrePopOpen, setGenrePopOpen] = useState<boolean>(false);

  const mapRef = useRef<L.Map>(null);

  const cities = new Set(markers.map((marker) => marker.city));
  const names = new Set(markers.map((marker) => marker.alt));
  const genres = new Set(
    markers.flatMap((marker) => marker.music_types?.map((type) => type.name))
  );

  const handleCityChange = async function (val: string) {
    setCity(val);
    setCityPopOpen(false);
  };

  const handleFestChange = async function (val: string) {
    setFest(val);
    setFestPopOpen(false);
  };

  const handleGenreChange = async function (val: string) {
    setGenre(val);
    setGenrePopOpen(false);
  };

  const handleReset = async function () {
    setCity("");
    setFest("");
    setGenre("");
    router.push("/festival-map");
  };

  const customIcon = new Icon({
    iconUrl: "/icons8-stage-64.png",
    iconSize: [30, 30], // size of the icon
  });

  const createClusterCustomIcon = function (cluster: any) {
    return L.divIcon({
      html: `<p class="text-neutral-100">${cluster.getChildCount()}</p>`,
      className:
        "flex! justify-center! items-center! bg-teal-600 rounded-[50%] text-[#fff] font-bold w-full h-full",
      iconSize: L.point(30, 30, true),
    });
  };

  return (
    <section className="relative">
      <MapContainer
        ref={mapRef}
        preferCanvas={true}
        center={center as LatLngExpression}
        maxZoom={14}
        zoom={zoom}
        minZoom={zoom}
        scrollWheelZoom={true}
        className="w-[100svw] min-h-custom"
      >
        <MapLibreTileLayer
          attribution='&copy; <a href="https://openfreemap.org/" target="_blank">OpenFreeMap</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.openfreemap.org/styles/positron"
        />
        <MarkerClusterGroup
          maxClusterRadius={50}
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker) => (
            <Dialog key={marker.id}>
              <Marker
                alt={marker.alt}
                position={marker.position}
                icon={customIcon}
              >
                <Popup closeButton={false} closeOnEscapeKey offset={[0, 5]}>
                  <div className="flex flex-col justify-between items-center gap-2">
                    <h4 className="font-bold text-md m-0">{marker.popup}</h4>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer bg-teal-600 hover:bg-teal-600/80">
                        Szczegóły
                      </Button>
                    </DialogTrigger>
                  </div>
                </Popup>
              </Marker>
              <DialogContent className="border-none flex flex-col justify-between items-center max-w-[60em] max-h-full overflow-y-scroll">
                <Image
                  src={marker.imageSrc}
                  alt={marker.imageAlt}
                  width={marker.imageWidth}
                  height={marker.imageHeight}
                  className="rounded-sm aspect-video"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <DialogTitle className="my-0">{marker.alt}</DialogTitle>

                <div className="flex flex-col items-center justify-center">
                  <p className="text-teal-400 m-0">
                    {marker.city} - {marker.location}
                  </p>
                  {marker.date && marker.endDate ? (
                    <p className="m-0 text-teal-400">
                      {formatDateToLocal(marker.date.toString())} -{" "}
                      {formatDateToLocal(marker.endDate.toString())}
                    </p>
                  ) : marker.date && !marker.endDate ? (
                    <p className="m-0">
                      {formatDateToLocal(marker.date.toString())}
                    </p>
                  ) : (
                    <p className="font-bold text-white">Brak daty</p>
                  )}
                  {marker.date && !isValidUrl(marker.tickets as string) && (
                    <p
                      className={cn(
                        "font-bold text-white",
                        marker.tickets === null ? "hidden" : "block"
                      )}
                    >
                      {marker.tickets}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <Button variant={"outline"}>
                    <Link
                      target="_blank"
                      className="font-bold"
                      href={
                        marker.articleSlug === undefined
                          ? `/tags/${marker.slug}`
                          : `/articles/${marker.articleSlug}`
                      }
                    >
                      Czytaj więcej
                    </Link>
                  </Button>
                  {marker.date && isValidUrl(marker.tickets as string) && (
                    <Button variant={"outline"}>
                      <Link
                        target="_blank"
                        className="font-bold"
                        href={`${marker.tickets}`}
                        rel="noopener noreferrer"
                      >
                        Bilety
                      </Link>
                    </Button>
                  )}
                  <Button variant={"outline"}>
                    <Link
                      href={`https://www.google.com/maps?q=${marker.position[0]},${marker.position[1]}`}
                      className="font-bold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Nawiguj
                    </Link>
                  </Button>
                </div>
                <DialogDescription className="text-white text-center">
                  {marker.description}
                </DialogDescription>
              </DialogContent>
            </Dialog>
          ))}
        </MarkerClusterGroup>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button className="cursor-pointer z-800 absolute left-[50%] translate-x-[-50%] top-10  w-[200px] bg-teal-600 hover:bg-teal-600/80">
              Filtruj
            </Button>
          </DrawerTrigger>
          <DrawerContent className="container z-900 border-none flex flex-col justify-center items-center">
            <DrawerHeader className="mt-0">
              <DrawerTitle className="py-0 my-0 text-white">Filtry</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription className="hidden">
              Wybierz jeden z poniszych filtrów
            </DrawerDescription>
            <div className="flex flex-col gap-4 m-4 w-max">
              <Popover open={cityPopOpen} onOpenChange={setCityPopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={cityPopOpen}
                    className="xl:w-[200px] justify-between"
                  >
                    {city || "Wybierz miejscowość..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                  <Command>
                    <CommandInput
                      placeholder="Wybierz miejscowość..."
                      className="h-9"
                    />
                    <CommandList className="h-50">
                      <CommandEmpty>Brak miasta</CommandEmpty>
                      <CommandGroup>
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
              <Popover open={festPopOpen} onOpenChange={setFestPopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={festPopOpen}
                    className="xl:w-[200px] justify-between"
                  >
                    {fest || "Wybierz festiwal..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                  <Command>
                    <CommandInput
                      placeholder="Wybierz festiwal..."
                      className="h-9"
                    />
                    <CommandList className="h-50">
                      <CommandEmpty>Brak festiwalu</CommandEmpty>
                      <CommandGroup>
                        {[...names].sort().map((val) => (
                          <CommandItem
                            key={val}
                            value={val}
                            onSelect={(currentValue) => {
                              handleFestChange(currentValue);
                            }}
                          >
                            {val}
                            <Check
                              className={cn(
                                "ml-auto",
                                fest === val ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Popover open={genrePopOpen} onOpenChange={setGenrePopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={genrePopOpen}
                    className="xl:w-[200px] justify-between"
                  >
                    {genre || "Wybierz gatunek..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="xl:w-[200px] p-0 pointer-events-auto">
                  <Command>
                    <CommandInput
                      placeholder="Wybierz gatunek..."
                      className="h-9"
                    />
                    <CommandList className="h-50">
                      <CommandEmpty>Brak gatunku</CommandEmpty>
                      <CommandGroup>
                        {[...genres].sort().map((val) => (
                          <CommandItem
                            key={val}
                            value={val}
                            onSelect={(currentValue) => {
                              handleGenreChange(currentValue);
                            }}
                          >
                            {val}
                            <Check
                              className={cn(
                                "ml-auto",
                                genre === val ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                className="bg-teal-600 hover:bg-teal-600/80"
                onClick={() => {
                  handleReset();
                }}
              >
                Resetuj pola
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </MapContainer>

      <div className="absolute bottom-8 right-0 sm:bottom-0 sm:left-0 z-500 text-neutral-700 bg-neutral-100 font-normal px-[5px] text-[12px] w-fit">
        <a
          className="text-blue-500"
          target="_blank"
          href="https://icons8.com/icon/hWDCzzX8jyhy/stage"
        >
          Stage
        </a>{" "}
        icon by{" "}
        <a className="text-blue-500" target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import L, { Icon, LatLngExpression } from "leaflet";
import { useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../dialog";
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

export default function Map({
  markers,
  genres,
}: {
  markers: MarkerType[];
  genres: string[];
}) {
  const center = [51.974077, 19.451946];
  const zoom = 6;
  const [dialog, setDialog] = useState<boolean>(false);
  const [cityValue, setCityValue] = useState<string>("");
  const [festValue, setFestValue] = useState<string>("");
  const [genreValue, setGenreValue] = useState<string>("");
  const [cityPopOpen, setCityPopOpen] = useState<boolean>(false);
  const [festPopOpen, setFestPopOpen] = useState<boolean>(false);
  const [genrePopOpen, setGenrePopOpen] = useState<boolean>(false);

  const mapRef = useRef<L.Map>(null);
  const cities = new Set(markers.map((marker) => marker?.city));
  const names = new Set(markers.map((marker) => marker.alt));
  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>(markers);

  const handleCityChange = function (val: string) {
    const marker = markers.filter((marker) => marker?.city === val);
    setCityValue(val);
    setFilteredMarkers(marker);
    if (mapRef.current != null) {
      mapRef.current.setView(marker[0].position, 10, { duration: 1 });
    }
    setCityPopOpen(false);
  };

  const handleFestChange = function (val: string) {
    const marker = markers.filter((marker) => marker.alt == val);
    setFestValue(val);
    setFilteredMarkers(marker);
    if (mapRef.current != null) {
      mapRef.current.setView(marker[0].position, 10, { duration: 1 });
    }
    setFestPopOpen(false);
  };

  const handleGenreChange = function (val: string) {
    const markersWithGenre = markers.filter((marker) =>
      marker.music_types?.some((g) => g.name === val)
    );

    setGenreValue(val);
    setFilteredMarkers(markersWithGenre);
    if (mapRef.current != null) {
      mapRef.current.setView(center as LatLngExpression, zoom, { duration: 1 });
    }
    setGenrePopOpen(false);
  };

  const handleReset = function () {
    setFilteredMarkers(markers);
    setCityValue("");
    setFestValue("");
    setGenreValue("");
    if (mapRef.current != null) {
      mapRef.current.setView(center as LatLngExpression, zoom, { duration: 1 });
    }
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
          {filteredMarkers.map((marker) => (
            <Dialog key={marker.id}>
              <Marker
                alt={marker.alt}
                position={marker.position}
                icon={customIcon}
              >
                <Popup closeButton={false} closeOnEscapeKey offset={[0, 5]}>
                  <div className="text-center flex flex-col gap-4">
                    <h4 className="font-bold text-[16px]">{marker.popup}</h4>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer bg-teal-600 hover:bg-teal-600/80">
                        Szczegóły
                      </Button>
                    </DialogTrigger>
                  </div>
                </Popup>
              </Marker>
              <DialogContent className="border-none flex flex-col justify-between items-center max-w-[60em] max-h-full overflow-y-hidden">
                <Image
                  src={marker.imageSrc}
                  alt={marker.imageAlt}
                  width={marker.imageWidth}
                  height={marker.imageHeight}
                  className="rounded-sm aspect-video"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <DialogTitle className="my-0">
                  <Link
                    target="_blank"
                    className="hover:underline text-white"
                    href={`/tags/${marker.slug}`}
                  >
                    {marker.alt}
                  </Link>
                </DialogTitle>

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
                    <p className="font-bold text-foreground">Bra daty</p>
                  )}
                </div>
                {marker.date && isValidUrl(marker.tickets as string) ? (
                  <Button className="bg-teal-600">
                    <Link
                      target="_blank"
                      className="font-bold"
                      href={`${marker.tickets}`}
                      rel="nofollow"
                    >
                      Bilety
                    </Link>
                  </Button>
                ) : marker.date &&
                  (marker.tickets == "" || marker.tickets === null) ? (
                  <p className="font-bold text-foreground">
                    Brak informacji o biletach
                  </p>
                ) : (
                  marker.date && (
                    <p className="font-bold text-foreground">
                      {marker.tickets}
                    </p>
                  )
                )}
                <DialogDescription className="text-white text-center">
                  {marker.description}
                </DialogDescription>
              </DialogContent>
            </Dialog>
          ))}
        </MarkerClusterGroup>
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogTrigger asChild>
            <Button
              className="cursor-pointer z-900 absolute left-[50%] translate-x-[-50%] top-10  w-[200px] bg-teal-600 hover:bg-teal-600/80"
              onClick={() => setDialog(true)}
            >
              Filtruj
            </Button>
          </DialogTrigger>
          <DialogContent className="container border-none flex flex-col items-center justify-start">
            <DialogHeader>
              <DialogTitle className="m-0 text-white">Filtruj mapę</DialogTitle>
            </DialogHeader>
            <DialogDescription className="m-0 text-white">
              Wybierz jeden z poniszych filtrów
            </DialogDescription>
            <div className="flex flex-col justify-around md:flex-row gap-4">
              <Popover open={cityPopOpen} onOpenChange={setCityPopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={festValue !== "" || genreValue !== ""}
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
                    <CommandInput
                      placeholder="Wybierz miasto..."
                      className="h-9"
                    />
                    <CommandList className="h-50">
                      <CommandEmpty>Brak miasta</CommandEmpty>
                      <CommandGroup>
                        {[...cities].sort().map((city) => (
                          <CommandItem
                            key={city}
                            value={city}
                            onSelect={(currentValue) => {
                              handleCityChange(currentValue);
                              setDialog(false);
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
              <Popover open={festPopOpen} onOpenChange={setFestPopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={cityValue !== "" || genreValue !== ""}
                    variant="outline"
                    role="combobox"
                    aria-expanded={festPopOpen}
                    className="xl:w-[200px] justify-between"
                  >
                    {festValue
                      ? [...names].find((name) => name === festValue)
                      : "Wybierz festiwal..."}
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
                        {[...names].sort().map((name) => (
                          <CommandItem
                            key={name}
                            value={name}
                            onSelect={(currentValue) => {
                              handleFestChange(currentValue);
                              setDialog(false);
                            }}
                          >
                            {name}
                            <Check
                              className={cn(
                                "ml-auto",
                                festValue === name ? "opacity-100" : "opacity-0"
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
                    disabled={festValue !== "" || cityValue !== ""}
                    variant="outline"
                    role="combobox"
                    aria-expanded={genrePopOpen}
                    className="xl:w-[200px] justify-between"
                  >
                    {genreValue
                      ? [...genres].find((genre) => genre === genreValue)
                      : "Wybierz gatunek..."}
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
                        {[...genres].sort().map((genre) => (
                          <CommandItem
                            key={genre}
                            value={genre}
                            onSelect={(currentValue) => {
                              handleGenreChange(currentValue);
                              setDialog(false);
                            }}
                          >
                            {genre}
                            <Check
                              className={cn(
                                "ml-auto",
                                genreValue === genre
                                  ? "opacity-100"
                                  : "opacity-0"
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
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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

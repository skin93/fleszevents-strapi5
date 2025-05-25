/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import L, { Icon, LatLngExpression } from "leaflet";
import { useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";
import { formatDateToLocal } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Marker as MarkerType } from "@/lib/interfaces";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapLibreTileLayer } from "./map-libre-tile-layer";
import { Input } from "../input";

export default function Map({
  markers,
  genres,
}: {
  markers: MarkerType[];
  genres: string[];
}) {
  const center = [51.974077, 19.451946];
  const zoom = 6;
  const [inputVal, setInputVal] = useState<string>("");
  const [cityValue, setCityValue] = useState<string>("");
  const [festValue, setFestValue] = useState<string>("");
  const [genreValue, setGenreValue] = useState<string>("");
  const mapRef = useRef<L.Map>(null);

  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>(markers);
  const cities = new Set(markers.map((marker) => marker?.city));
  const names = new Set(markers.map((marker) => marker.alt));

  const handleNameChange = function (val: string) {
    const marker = markers.filter((marker) =>
      marker?.alt?.toLowerCase().includes(val.toLowerCase())
    );
    setInputVal(val);
    setFilteredMarkers(marker);
    if (mapRef.current != null) {
      mapRef.current.setView(center as LatLngExpression, zoom, { duration: 1 });
    }
  };

  const handleCityChange = function (val: string) {
    const marker = markers.filter((marker) => marker?.city === val);
    setCityValue(val);
    setFilteredMarkers(marker);
    if (mapRef.current != null) {
      mapRef.current.setView(marker[0].position, 10, { duration: 1 });
    }
  };

  const handleFestChange = function (val: string) {
    const marker = markers.filter((marker) => marker.alt == val);
    setFestValue(val);
    setFilteredMarkers(marker);
    if (mapRef.current != null) {
      mapRef.current.setView(marker[0].position, 10, { duration: 1 });
    }
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
  };

  const handleReset = function () {
    setFilteredMarkers(markers);
    setCityValue("");
    setFestValue("");
    setGenreValue("");
    setInputVal("");
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
        center={[51.974077, 19.451946]}
        maxZoom={14}
        zoom={zoom}
        minZoom={zoom}
        scrollWheelZoom={true}
        className="w-[100svw] h-[calc(100svh-56px)]"
      >
        <MapLibreTileLayer
          attribution='&copy; <a href="https://openfreemap.org/" target="_blank">OpenFreeMap</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.openfreemap.org/styles/positron"
        />
        <MarkerClusterGroup
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
                <Popup>
                  <DialogTrigger asChild>
                    <div className="text-center">
                      <h4 className="font-bold my-0!">{marker.popup}</h4>
                      <Button className="cursor-pointer" variant={"ghost"}>
                        Szczegóły
                      </Button>
                    </div>
                  </DialogTrigger>
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
                    className="hover:underline"
                    href={`/tags/${marker.slug}`}
                  >
                    {marker.alt}
                  </Link>
                </DialogTitle>

                <div className="flex flex-col items-center justify-center">
                  <p className="text-foreground m-0">
                    {marker.city} - {marker.location}
                  </p>
                  {marker.date && marker.endDate ? (
                    <p className="text-foreground m-0">
                      {formatDateToLocal(marker.date.toString())} -{" "}
                      {formatDateToLocal(marker.endDate.toString())}
                    </p>
                  ) : marker.date && !marker.endDate ? (
                    <p className="text-foreground m-0">
                      {formatDateToLocal(marker.date.toString())}
                    </p>
                  ) : (
                    <p>Brak daty</p>
                  )}
                </div>
                {marker.tickets && (
                  <Button variant={"default"} className="w-fit mx-auto">
                    <Link
                      target="_blank"
                      className="font-bold"
                      href={`${marker.tickets}`}
                    >
                      Bilety
                    </Link>
                  </Button>
                )}
                <DialogDescription>{marker.description}</DialogDescription>
              </DialogContent>
            </Dialog>
          ))}
        </MarkerClusterGroup>
        <div className="absolute top-3 right-3 z-500 flex xl:flex-row flex-col gap-4">
          <Input
            value={inputVal}
            placeholder="Podaj nazwę"
            onChange={(e) => handleNameChange(e.target.value)}
            disabled={festValue !== "" || genreValue !== "" || cityValue !== ""}
          />

          <Select
            value={cityValue}
            onValueChange={(val) => handleCityChange(val)}
            disabled={festValue !== "" || genreValue !== "" || inputVal !== ""}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wybierz miasto" />
            </SelectTrigger>
            <SelectContent className="z-500">
              {[...cities].sort().map((city, index) => (
                <SelectItem key={city} value={city as string}>
                  {`${index + 1}. ${city}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={festValue}
            onValueChange={(val) => handleFestChange(val)}
            disabled={cityValue !== "" || genreValue !== "" || inputVal !== ""}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wybierz festiwal" />
            </SelectTrigger>
            <SelectContent className="z-500">
              {[...names].sort().map((name, index) => (
                <SelectItem key={name} value={name}>
                  {`${index + 1}. ${name}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={genreValue}
            onValueChange={(val) => handleGenreChange(val)}
            disabled={cityValue !== "" || festValue !== "" || inputVal !== ""}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wybierz gatunek" />
            </SelectTrigger>
            <SelectContent className="z-500">
              {[...genres].sort().map((genre, index) => (
                <SelectItem key={genre} value={genre}>
                  {`${index + 1}. ${genre}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleReset}>Reset</Button>
        </div>
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

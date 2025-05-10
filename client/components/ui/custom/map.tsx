/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import L, { Icon } from "leaflet";
import { useState } from "react";
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

export default function Map({ markers }: { markers: MarkerType[] }) {
  const cities = new Set(markers.map((marker) => marker.city));
  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>(markers);
  const handleChange = function (val: string) {
    if (val === "Wszystkie") {
      setFilteredMarkers(markers);
      return;
    }
    setFilteredMarkers(markers.filter((marker) => marker.city === val));
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
        preferCanvas={true}
        center={[51.974077, 19.451946]}
        maxZoom={12}
        zoom={7}
        minZoom={7}
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
      </MapContainer>

      <div className="absolute top-8 right-8 z-500">
        <Select onValueChange={(val) => handleChange(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wybierz miasto" />
          </SelectTrigger>
          <SelectContent className="z-500">
            <SelectItem value="Wszystkie">Wszystkie</SelectItem>
            {[...cities].sort().map((city) => (
              <SelectItem key={city} value={city as string}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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

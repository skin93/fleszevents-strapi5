"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Patronage } from "@/lib/interfaces";
import Image from "next/image";
import { getMediaUrl } from "@/lib/getMediaUrl";

type Props = {
  patronages: Patronage[];
};

export function Patronages({ patronages }: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <section
      aria-label="Promo events"
      className="flex flex-col justify-center items-center "
    >
      <h1 className=" text-center">PATRONAT I WSPÓŁPRACA</h1>
      <Carousel
        plugins={[plugin.current]}
        className="w-full border border-white/10 bg-[var(--color-foreground)]/5 text-[contrast-color(var(--color-foreground))] backdrop-blur-md rounded-sm shadow-md relative p-10"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {patronages?.map((patronage) => (
            <CarouselItem
              key={patronage.documentId}
              className="basis basis-1/2 lg:basis-1/5"
            >
              <Card className="border-none">
                <CardContent className="flex aspect-video items-center justify-center p-0">
                  <Image
                    loading={"eager"}
                    unoptimized
                    src={getMediaUrl(patronage.cover)}
                    title={patronage.name}
                    alt={patronage.cover.alternativeText}
                    placeholder="blur"
                    blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    style={{ objectFit: "cover" }}
                    width={patronage.cover.width}
                    height={patronage.cover.height}
                    className="rounded-sm aspect-video "
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

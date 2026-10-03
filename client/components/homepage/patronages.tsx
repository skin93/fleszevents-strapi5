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
import Image from "strapi-next-image";
import Section from "../ui/custom/section";

type Props = {
  patronages: Patronage[];
};

export function Patronages({ patronages }: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <Section ariaLabel="Promo events">
      <h1 className=" text-center mt-0 mb-6">PATRONAT I WSPÓŁPRACA</h1>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
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
                <CardContent className="flex  items-center justify-center p-0">
                  <Image
                    src={patronage.cover}
                    alt={patronage.cover.alternativeText}
                    sizes="(min-width: 1536px) 256px, (min-width: 1280px) 212px, (min-width: 1024px) 160px, (min-width: 768px) 295px, (min-width: 640px) 231px, calc(47.22vw - 81px)"
                    priority
                    style={{ objectFit: "cover" }}
                    className="rounded-sm aspect-[3/2]"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}

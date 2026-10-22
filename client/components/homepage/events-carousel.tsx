"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Article, Event } from "@/lib/interfaces";
import PromoCard from "../ui/custom/promo-card";
import Section from "../ui/custom/section";

interface Props {
  promos?: Article[];
  events?: Event[];
  label: string;
  category: "polecamy" | "koncerty" | "festiwale";
}

export default function EventsCarousel({
  promos,
  events,
  label,
  category,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));
  return (
    <Section ariaLabel="Wyróżnione wydarzenia">
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-0 mb-6 uppercase">
        {label}
      </h2>
      <Carousel
        setApi={setApi}
        className="rounded-sm overflow-hidden border shadow-md"
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {promos
            ? promos?.map((promo) => (
                <CarouselItem key={promo.documentId}>
                  <div key={promo.documentId}>
                    <Link href={`/${category}/${promo.slug}`}>
                      <PromoCard article={promo} />
                    </Link>
                  </div>
                </CarouselItem>
              ))
            : events?.map((event) => (
                <CarouselItem key={event.documentId}>
                  <div key={event.documentId}>
                    <Link href={`/${category}/${event.article?.slug}`}>
                      <PromoCard event={event} />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex justify-center gap-1.5 flex-1">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                current === index + 1
                  ? "bg-primary w-6"
                  : "bg-muted-foreground hover:bg-muted-foreground/50"
              }`}
              aria-label={`Przejdź do slajdu ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

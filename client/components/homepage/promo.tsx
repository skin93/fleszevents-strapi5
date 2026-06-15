"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import BaseCard from "@/components/ui/custom/base-card";
import { useRef } from "react";
import { Article } from "@/lib/interfaces";

interface Props {
  promos: Article[];
}

export default function Promo({ promos }: Props) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <section
      aria-label="Promo events"
      className="flex flex-col justify-center items-center"
    >
      <h1 className=" text-center">POLECAMY</h1>
      <Carousel
        className="max-w-full"
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {promos?.map((promo) => (
            <CarouselItem
              key={promo.documentId}
              className="basis sm:basis-1/2 lg:basis-1/3"
            >
              <div key={promo.documentId}>
                <Link href={`/polecamy/${promo.slug}`}>
                  <BaseCard article={promo} />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}

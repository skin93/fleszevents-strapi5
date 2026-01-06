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
      className="flex flex-col justify-center items-center my-8"
    >
      <h1 className="mb-8 text-center">POLECAMY</h1>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {promos?.map((promo) => (
            <CarouselItem
              key={promo.documentId}
              className="basis md:basis-1/2 xl:basis-1/3"
            >
              <div key={promo.documentId}>
                <Link href={`/articles/${promo.slug}`}>
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

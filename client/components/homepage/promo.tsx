"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useRef } from "react";
import { Article } from "@/lib/interfaces";
import PromoCard from "../ui/custom/promo-card";

interface Props {
  promos: Article[];
}

export default function Promo({ promos }: Props) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
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
              <div key={promo.documentId} className="h-auto">
                <Link href={`/polecamy/${promo.slug}`}>
                  <PromoCard article={promo} />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* {promos?.map((promo) => (
        <div key={promo.documentId}>
          <Link href={`/polecamy/${promo.slug}`}>
            <PromoCard article={promo} />
          </Link>
        </div>
      ))} */}
    </section>
  );
}

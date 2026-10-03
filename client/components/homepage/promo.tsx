"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useRef } from "react";
import { Article } from "@/lib/interfaces";
import PromoCard from "../ui/custom/promo-card";
import Section from "../ui/custom/section";

interface Props {
  promos: Article[];
}

export default function Promo({ promos }: Props) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  return (
    <Section ariaLabel="Promo events">
      <h1 className=" text-center mt-0 mb-6">POLECAMY</h1>
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
              className="basis basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
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
    </Section>
  );
}

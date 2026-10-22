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
import { Article } from "@/lib/interfaces";
import PromoCard from "../ui/custom/promo-card";
import Section from "../ui/custom/section";

interface Props {
  promos: Article[];
}

export default function Promo({ promos }: Props) {
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

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  return (
    <Section ariaLabel="Promo events">
      <h2 className="uppercase my-6">POLECAMY</h2>
      <div className="mx-auto w-full">
        <Carousel
          setApi={setApi}
          className="rounded-sm overflow-hidden border shadow-md"
          plugins={[plugin.current]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {promos?.map((promo) => (
              <CarouselItem key={promo.documentId}>
                <div key={promo.documentId}>
                  <Link href={`/polecamy/${promo.slug}`}>
                    <PromoCard article={promo} />
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
                    ? "bg-primary w-6" // Aktywna kropka jest szersza (efekt pigułki)
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
                aria-label={`Przejdź do slajdu ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

import Section from "@/components/ui/custom/section";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="max-w-7xl  mx-auto">
      <Section ariaLabel="wrapper">
        <Skeleton className="w-full h-[74px]  rounded-none mb-6" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          <Skeleton className="w-full h-[444px] aspect-video" />
          <Skeleton className="w-full h-[444px] aspect-video" />
          <Skeleton className="w-full h-[444px] aspect-video" />
          <Skeleton className="w-full h-[444px] aspect-video" />
          <Skeleton className="w-full h-[444px] aspect-video" />
          <Skeleton className="w-full h-[444px] aspect-video" />
          <Skeleton className="w-full h-[444px] aspect-video" />
          <Skeleton className="w-full h-[444px] aspect-video" />
        </div>
      </Section>
    </main>
  );
}

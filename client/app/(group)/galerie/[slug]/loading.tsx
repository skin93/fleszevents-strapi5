import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto">
      <Skeleton className="w-full h-[74px] my-6 rounded-none" />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
        <Skeleton className="w-full h-[302px] aspect-video" />
      </section>
    </main>
  );
}

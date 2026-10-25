import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="container mx-auto">
      <Skeleton className="w-full h-[74px] my-6 rounded-none" />
      <div className="flex flex-row gap-6 my-6">
        <Skeleton className="w-[300px] h-[40px]  rounded-none" />
        <Skeleton className="w-[70px] h-[40px] rounded-none" />
      </div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
      </section>
    </main>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main>
      <Skeleton className="mx-auto w-[25%] h-[100px] my-8" />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
      </section>
      <Skeleton className="h-[5px] w-full mt-8" />
      <Skeleton className="mx-auto w-[25%] h-[100px] my-8" />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
      </section>
      <Skeleton className="h-[5px] w-full mt-8" />
      <Skeleton className="mx-auto w-[25%] h-[100px] my-8" />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
      </section>
      <Skeleton className="h-[5px] w-full mt-8" />
      <Skeleton className="mx-auto w-[25%] h-[100px] my-8" />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
        <Skeleton className="w-full h-[387px] aspect-video" />
      </section>
      <Skeleton className="h-[5px] w-full mt-8" />
    </main>
  );
}

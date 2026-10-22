import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto">
      <Skeleton className="w-[25%] h-[100px] my-6" />
      <section className="grid grid-cols-1">
        <Skeleton className="w-full h-[276px] aspect-video" />
      </section>
      <Skeleton className="w-[25%] h-[100px] my-6" />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
      </section>
      <Skeleton className="w-[25%] h-[100px] my-6" />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
        <Skeleton className="w-full h-[276px] aspect-video" />
      </section>
      <Skeleton className="w-[25%] h-[100px] my-6" />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

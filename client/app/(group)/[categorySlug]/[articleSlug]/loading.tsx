import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main>
      <section className="my-8">
        <div className="flex flex-row gap-4">
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
        </div>
        <Skeleton className="w-full h-[50px] my-4 rounded-none" />
        <div className="grid grid-cols-1 xl:grid-cols-[60%_35%] justify-between">
          <div className=" w-full">
            <Skeleton className="aspect-video w-full h-100 rounded-sm" />

            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
          </div>

          <div className="w-full flex-col justify-between items-start">
            <Skeleton className="w-full h-25 rounded-none my-8" />
            <div className="grid grid-cols-1 justify-center mx-auto">
              <Skeleton className="aspect-video w-full h-25 my-2 rounded-sm" />
              <Skeleton className="aspect-video w-full h-25 my-2 rounded-sm" />
              <Skeleton className="aspect-video w-full h-25 my-2 rounded-sm" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

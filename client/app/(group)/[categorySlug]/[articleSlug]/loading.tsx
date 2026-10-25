import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="container  mx-auto">
      <section className="my-6">
        <Skeleton className="w-full h-[74px] my-6 rounded-none" />
        <div className="flex flex-row gap-4 my-6">
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
        </div>
        <Skeleton className="aspect-video w-full h-[46px] mt-6 rounded-sm" />
        <Skeleton className="aspect-video w-full h-[36px] mt-6 rounded-sm" />
        <div className="grid grid-cols-1 xl:grid-cols-[50%_45%] justify-between">
          <div className=" w-full">
            <Skeleton className="w-full h-[512px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
          </div>
          <div className="w-full flex-col justify-between items-start">
            <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none my-6" />
            <div className="grid grid-cols-1 justify-center mx-auto">
              <Skeleton className="aspect-video w-full h-[130px] my-2 rounded-sm" />
              <Skeleton className="aspect-video w-full h-[130px] my-2 rounded-sm" />
              <Skeleton className="aspect-video w-full h-[130px] my-2 rounded-sm" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

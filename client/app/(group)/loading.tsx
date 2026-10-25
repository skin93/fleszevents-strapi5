import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="container mx-auto">
      <section className="m-6 grid grid-cols-1 xl:grid-cols-[33.33%_33.33%_33.33%] container mx-auto gap-10">
        <div className="m-6">
          <Skeleton className="w-[250px] h-[40px] mb-6" />
          <Skeleton className="w-full h-[200px] aspect-video" />
        </div>
        <div className="m-6">
          <Skeleton className="w-[250px] h-[40px] mb-6" />
          <Skeleton className="w-full h-[200px] aspect-video" />
        </div>
        <div className="m-6">
          <Skeleton className="w-[250px] h-[40px] mb-6" />
          <Skeleton className="w-full h-[200px] aspect-video" />
        </div>
      </section>
      <section className="m-6 grid grid-cols-1 xl:grid-cols-[70%_30%] container mx-auto gap-10">
        <div>
          <div>
            <Skeleton className="w-[250px] h-[40px] m-6" />
            <section className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
            </section>
          </div>
          <div>
            <Skeleton className="w-[250px] h-[40px] m-6" />
            <section className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
            </section>
          </div>
          <div>
            <Skeleton className="w-[250px] h-[40px] m-6" />
            <section className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
            </section>
          </div>
          <div>
            <Skeleton className="w-[250px] h-[40px] m-6" />
            <section className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
              <Skeleton className="w-full h-[430px] aspect-video" />
            </section>
          </div>
        </div>
        <div className="w-full flex-col justify-between items-start m-6">
          <Skeleton className="w-[250px] h-[40px] rounded-none m-6" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
          <Skeleton className="aspect-video w-full h-[128px] my-2 rounded-sm" />
        </div>
      </section>
    </main>
  );
}

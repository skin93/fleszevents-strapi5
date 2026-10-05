"use client";
import { useRouter } from "next/navigation";

import { Command, CommandInput } from "@/components/ui/command";

import { useGalleryFilters, usePaginationFilters } from "@/hooks/use-filters";
import { debounce } from "nuqs";
import { Button } from "../ui/button";

export default function GalleryFilters() {
  const router = useRouter();

  const {
    filters: { q },
    setQ,
  } = useGalleryFilters();

  const { setPage } = usePaginationFilters();

  const handleQChange = (val: string) => {
    setQ(val, { limitUrlUpdates: val === "" ? undefined : debounce(500) });
  };

  const handleReset = () => {
    setQ(null);
    setPage(1);
    router.push("/galerie");
  };
  return (
    <div className="flex flex-row justify-center items-center gap-4 mt-6 p-6 border border-black/10 bg-white/85 dark:border-white/5 dark:bg-[var(--color-foreground)]/5 backdrop-blur-md rounded-sm shadow-md">
      <Command className="max-w-[300px]">
        <CommandInput
          placeholder="Szukaj frazy..."
          value={q as string}
          onValueChange={(val) => {
            handleQChange(val);
          }}
        />
      </Command>
      <Button className="w-fit" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
}

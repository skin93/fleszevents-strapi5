import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-foreground dark:bg-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

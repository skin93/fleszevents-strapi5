import React from "react";
import { Button } from "../button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  href: string;
  children?: React.ReactNode;
};

export function ButtonLink({ href, children, className }: Props) {
  return (
    <Button
      aria-label="button-link"
      className={cn(className, "uppercase")}
      variant={"ghost"}
    >
      <Link aria-label={`Link to ${href}`} href={href}>
        {children}
      </Link>
    </Button>
  );
}

export function ReadMoreLink({ href, className }: Props) {
  return (
    <Button
      aria-label="read-more-button"
      className={cn(className, "uppercase my-6 font-bold")}
      variant={"default"}
    >
      <Link href={href}>ZOBACZ WIĘCEJ</Link>
    </Button>
  );
}

import React from "react";

type Props = {
  ariaLabel: string;
  children: React.ReactNode;
};

export default function Section({ ariaLabel, children }: Props) {
  return (
    <section
      aria-label={ariaLabel}
      className="flex flex-col justify-center my-6 p-6 items-center border 
      border-black/10 bg-white/85dark:border-white/5 dark:bg-[var(--color-foreground)]/5 backdrop-blur-md rounded-sm shadow-md relative"
    >
      {children}
    </section>
  );
}

"use client";

import { initializeStrapiImage } from "strapi-next-image";

initializeStrapiImage(process.env.NEXT_PUBLIC_STRAPI as string);

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

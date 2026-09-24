import React, { Fragment } from "react";
import Header from "@/components/layout/header";
import { Providers } from "../provider";

export default function FestivalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      <Providers>{children}</Providers>
    </Fragment>
  );
}

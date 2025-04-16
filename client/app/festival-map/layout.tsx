import React, { Fragment } from "react";
import Header from "@/components/layout/header";

export default function FestivalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}

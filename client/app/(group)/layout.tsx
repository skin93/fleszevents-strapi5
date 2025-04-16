import React, { Fragment } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}

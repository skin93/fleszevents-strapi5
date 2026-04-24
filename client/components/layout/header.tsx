"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Facebook, Youtube, Menu } from "lucide-react";

import Image from "next/image";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components//ui/dropdown-menu";
import { ButtonLink } from "@/components/ui/custom/button-link";
import SearchDialog from "@/components/ui/custom/search-dialog";

const navLinks1: Array<{ title: string; path: string }> = [
  { title: "polecamy", path: "/categories/polecamy" },
  { title: "festiwale", path: "/categories/festiwale" },
  { title: "koncerty", path: "/categories/koncerty" },
  { title: "patronat", path: "/categories/patronat" },
  { title: "newsy", path: "/categories/newsy" },
  { title: "premiery", path: "/categories/premiery" },
  { title: "relacje", path: "/categories/relacje" },
  { title: "wywiady", path: "/categories/wywiady" },
];

const navLinks2: Array<{ title: string; path: string }> = [
  { title: "kalendarz", path: "/calendar" },
  { title: "festiwalowa mapa", path: "/festival-map" },
  { title: "galerie", path: "/galleries" },
  { title: "kontakt", path: "/contact" },
];

export default function Header() {
  return (
    <header className="p-4 sticky top-0 z-50 bg-foreground">
      <div className="container flex h-20 items-center">
        <Link
          href="/"
          className="flex shrink-0 justify-start items-center relative w-[100px] h-full mr-4"
        >
          <Image
            loading={"eager"}
            fill
            src="/FE_2_baner.svg"
            className="cursor-pointer w-full h-full "
            alt="logo"
          />
          <Image
            loading={"eager"}
            fill
            src="/FE_1_baner.svg"
            className="cursor-pointer w-full h-full dark:hidden"
            alt="logo"
          />
        </Link>

        <nav
          aria-label="main-navigation"
          className="hidden lg:flex justify-start items-center gap-2 "
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm  ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer hover:bg-foreground bg-transparent text-primary dark:text-background underline-offset-4 hover:underline py-2 px-4 font-extrabold">
              WPISY
            </DropdownMenuTrigger>

            <DropdownMenuContent className="z-1000">
              {navLinks1.map(({ title, path }) => (
                <DropdownMenuItem className="h-10" key={title}>
                  <Link className="uppercase" href={path}>
                    {title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {navLinks2.map(({ title, path }) => (
            <ButtonLink key={title} href={path}>
              {title}
            </ButtonLink>
          ))}
        </nav>

        <div className="ml-auto flex flex-row items-center">
          <div className="hidden lg:block ">
            <ButtonLink href="https://facebook.com/flesz.events">
              <Facebook />
            </ButtonLink>
            <ButtonLink href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg">
              <Youtube />
            </ButtonLink>
          </div>
          <SearchDialog />
          <ModeToggle />
          <div className="lg:hidden flex flex-col justify-center">
            <Drawer direction="right">
              <DrawerTrigger>
                <Menu
                  aria-label="menu-button"
                  className="text-primary dark:text-background"
                />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="hidden">
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerDescription>Menu with nav links</DrawerDescription>
                </DrawerHeader>
                {navLinks1.map(({ title, path }) => (
                  <ButtonLink
                    className="text-2xl text-foreground"
                    key={title}
                    href={path}
                  >
                    {title}
                  </ButtonLink>
                ))}
                <hr />
                {navLinks2.map(({ title, path }) => (
                  <ButtonLink className="text-2xl" key={title} href={path}>
                    {title}
                  </ButtonLink>
                ))}
                <ButtonLink href="https://facebook.com/flesz.events">
                  <Facebook />
                </ButtonLink>
                <ButtonLink href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg">
                  <Youtube />
                </ButtonLink>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}

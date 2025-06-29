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
  { title: "festiwale", path: "/categories/festiwale" },
  { title: "koncerty", path: "/categories/koncerty" },
  { title: "newsy", path: "/categories/newsy" },
  { title: "premiery", path: "/categories/premiery" },
  { title: "relacje", path: "/categories/relacje" },
  { title: "wywiady", path: "/categories/wywiady" },
];

const navLinks2: Array<{ title: string; path: string }> = [
  { title: "festiwalowa mapa", path: "/festival-map" },
  { title: "patronat", path: "/categories/patronat" },
  { title: "galerie", path: "/galleries" },
  { title: "kontakt", path: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky  top-0 z-50 w-full bg-background">
      <div className="container flex h-14 items-center">
        <Link
          href="/"
          className="flex shrink-0 justify-start items-center relative w-[100px] h-full mr-4"
        >
          <Image
            priority
            fill
            src="/FE_1_baner.svg"
            className="cursor-pointer w-full h-full "
            alt="logo"
          />
          <Image
            priority
            fill
            src="/FE_2_baner.svg"
            className="cursor-pointer w-full h-full dark:hidden"
            alt="logo"
          />
        </Link>

        <nav
          aria-label="main-navigation"
          className="hidden xl:flex justify-start items-center gap-2  w-fit"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer hover:bg-foreground bg-transparent dark:hover:bg-accent hover:text-accent-foreground py-2 px-4">
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
          <div className="hidden xl:block ">
            <ButtonLink href="https://facebook.com/flesz.events">
              <Facebook />
            </ButtonLink>
            <ButtonLink href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg">
              <Youtube />
            </ButtonLink>
          </div>
          <SearchDialog />
          <ModeToggle />
          <div className="xl:hidden">
            <Drawer direction="bottom">
              <DrawerTrigger>
                <Menu aria-label="menu-button" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="hidden">
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerDescription>Menu with nav links</DrawerDescription>
                </DrawerHeader>
                {navLinks1.map(({ title, path }) => (
                  <ButtonLink key={title} href={path}>
                    {title}
                  </ButtonLink>
                ))}
                {navLinks2.map(({ title, path }) => (
                  <ButtonLink key={title} href={path}>
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

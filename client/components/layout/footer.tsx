import { Facebook, Youtube } from "lucide-react";
import { ButtonLink } from "../ui/custom/button-link";

export default function Footer() {
  const navLinks = [
    { title: "polecamy", path: "/categories/polecamy" },
    { title: "festiwale", path: "/categories/festiwale" },
    { title: "koncerty", path: "/categories/koncerty" },
    { title: "patronat", path: "/categories/patronat" },
    { title: "newsy", path: "/categories/newsy" },
    { title: "premiery", path: "/categories/premiery" },
    { title: "relacje", path: "/categories/relacje" },
    { title: "wywiady", path: "/categories/wywiady" },
  ];

  const items = [
    { title: "festiwalowa mapa", path: "/festival-map" },
    { title: "galerie", path: "/galleries" },
    { title: "kontakt", path: "/contact" },
    { title: "tagi", path: "/tags" },
  ];

  return (
    <footer className="max-w-screen h-full bg-foreground p-4">
      <div className="container flex flex-col h-full items-center justify-around">
        <div className="flex flex-col md:flex-row xl:justify-center">
          {navLinks.map(({ title, path }) => (
            <ButtonLink key={title} href={path}>
              {title}
            </ButtonLink>
          ))}
        </div>
        <div className="flex flex-col md:flex-row xl:justify-around py-4">
          {items.map(({ title, path }) => (
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
        </div>
      </div>
      <div className="text-primary dark:text-background text-center font-extrabold">
        &copy; 2021 - {JSON.stringify(new Date().getFullYear())}, FleszEvents
      </div>
    </footer>
  );
}

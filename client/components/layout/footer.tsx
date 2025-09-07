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
    <footer className="w-full my-8">
      <div className="grid grid-cols-2 xl:grid-rows-2 xl:grid-cols-1">
        <div className="flex flex-col xl:flex-row xl:justify-center">
          {navLinks.map(({ title, path }) => (
            <ButtonLink key={title} href={path}>
              {title}
            </ButtonLink>
          ))}
        </div>
        {/* <div className="flex flex-row">
          {items.map(({ title, path }) => (
            <ButtonLink className="mx-auto" key={title} href={path}>
              {title}
            </ButtonLink>
          ))}
        </div> */}

        <div className="flex flex-col xl:flex-row xl:justify-center">
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
      <p className="text-center mt-8">&copy; FleszEvents</p>
    </footer>
  );
}

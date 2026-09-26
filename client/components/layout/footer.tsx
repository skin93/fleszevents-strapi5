import { Facebook, Youtube } from "lucide-react";
import { ButtonLink } from "../ui/custom/button-link";
import FooterLinksContainer from "../ui/custom/footer-links-container";

export default function Footer() {
  const festivalsNavLinks = [
    { title: "festiwalowa mapa", path: "/festiwalowa-mapa" },
    { title: "festiwale 2027", path: "/tagi/festiwale-2027" },
    { title: "festiwale 2026", path: "/tagi/festiwale-2026" },
    { title: "festiwale", path: "/festiwale" },
  ];

  const concertsNavLinks = [
    { title: "koncerty 2027", path: "/tagi/koncerty-2027" },
    { title: "koncerty 2026", path: "/tagi/koncerty-2026" },
    { title: "koncerty", path: "/koncerty" },
  ];

  const links = [
    { title: "patronat", path: "/patronat" },
    { title: "kontakt", path: "/kontakt" },
  ];

  return (
    <footer className="max-w-screen h-full bg-stone-950 p-4">
      <div className="container max-w-7xl grid grid-cols-2 md:grid-cols-4 h-full my-6">
        <FooterLinksContainer links={festivalsNavLinks} text={"festiwale"} />
        <FooterLinksContainer links={concertsNavLinks} text={"koncerty"} />
        <FooterLinksContainer links={links} text={"współpraca"} />

        <div className="flex flex-col items-start">
          <p className="px-4 py-2 m-0 uppercase dark:text-accent text-muted">
            sociale
          </p>
          <div className="flex flex-row">
            <ButtonLink href="https://facebook.com/flesz.events">
              <Facebook />
            </ButtonLink>
            <ButtonLink href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg">
              <Youtube />
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="text-primary text-center font-extrabold">
        &copy; 2021 - {JSON.stringify(new Date().getFullYear())}, FleszEvents
      </div>
    </footer>
  );
}

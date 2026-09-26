import React from "react";
import { ButtonLink } from "./button-link";

type Props = {
  text: string;
  links: {
    title: string;
    path: string;
  }[];
};

export default function FooterLinksContainer({ text, links }: Props) {
  return (
    <div className="flex flex-col items-start">
      <p className="px-4 py-2 m-0 uppercase dark:text-accent text-muted">
        {text}
      </p>
      {links.map(({ title, path }) => (
        <ButtonLink key={title} href={path}>
          {title}
        </ButtonLink>
      ))}
    </div>
  );
}

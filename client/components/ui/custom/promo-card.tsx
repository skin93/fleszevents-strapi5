"use client";
import { Article, Event, Media } from "@/lib/interfaces";
import { Fragment } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import Image from "strapi-next-image";

type Props = {
  article?: Article;
  event?: Event;
};

export default function PromoCard({ article, event }: Props) {
  return (
    <Fragment>
      {article ? (
        <div className="flex flex-row justify-start items-end w-full h-[200px] bg-transparent shadow-md relative">
          <Image
            src={article.cover}
            alt={article.cover.alternativeText}
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent " />
          <p
            className="p-4 absolute font-(family-name:--font-kalam) text-white
"
          >
            {article.title}
          </p>
        </div>
      ) : (
        <div className="flex flex-row justify-start items-end w-full h-[200px] bg-transparent shadow-md relative">
          <Image
            src={event?.article?.cover as Media}
            alt={event?.article?.cover.alternativeText as string}
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent " />
          <div className="p-4 absolute bottom-5 font-(family-name:--font-kalam) text-white">
            <p className="m-0"> {event?.name}</p>
            <p className="m-0">
              {format(event?.date as string, "dd MMMM yyy", { locale: pl })}
            </p>
            <p className="m-0">
              {event?.place?.city} - {event?.place?.location}
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
}

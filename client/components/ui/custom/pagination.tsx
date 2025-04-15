import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import { generatePagination } from "@/lib/utils";

type Props = {
  currentPage: number;
  pageCount: number;
  q?: string | undefined;
};

export default function CustomPagination({ currentPage, pageCount, q }: Props) {
  const allPages = generatePagination(currentPage, pageCount);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          href={
            q === undefined
              ? `?page=${currentPage - 1}`
              : `?q=${q}&page=${currentPage - 1}`
          }
          isDisabled={currentPage <= 1}
        />
        {allPages.map((p, index) => {
          let position: string | undefined;
          if (p === "...") position = "middle";

          return (
            <PaginationItem key={index}>
              <PaginationLink
                position={position}
                href={q === undefined ? `?page=${p}` : `?q=${q}&page=${p}`}
                isActive={currentPage === p}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationNext
          href={
            q === undefined
              ? `?page=${currentPage + 1}`
              : `?q=${q}&page=${currentPage + 1}`
          }
          isDisabled={currentPage >= pageCount}
        />
      </PaginationContent>
    </Pagination>
  );
}

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
};

export default function CustomPagination({ currentPage, pageCount }: Props) {
  const allPages = generatePagination(currentPage, pageCount);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          href={`?page=${currentPage - 1}`}
          isDisabled={currentPage <= 1}
        />
        {allPages.map((p, index) => {
          let position: string | undefined;
          if (p === "...") position = "middle";

          return (
            <PaginationItem key={index}>
              <PaginationLink
                position={position}
                href={`?page=${p}`}
                isActive={currentPage === p}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationNext
          href={`?page=${currentPage + 1}`}
          isDisabled={currentPage >= pageCount}
        />
      </PaginationContent>
    </Pagination>
  );
}

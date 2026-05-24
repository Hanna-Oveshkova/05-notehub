import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
    />
  );
}

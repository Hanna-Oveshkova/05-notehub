import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
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
};

export default Pagination;

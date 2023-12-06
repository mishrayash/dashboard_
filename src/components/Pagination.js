import React from "react";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
const Pagination = ({ page, setPage, total }) => {
  const prevpage = () => (page > 1 ? setPage(page - 1) : page);
  const nextpage = () => (page < total ? setPage(page + 1) : page);

  return (
    <div>
      <button onClick={prevpage}>
        <MdOutlineSkipPrevious />
      </button>
      {Array.from({ length: total }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            className={`px-1 border rounded font-medium text-gray-400 mx-1 ${
              pageNumber === page ? "bg-blue-500 text-white" : ""
            }`}
            key={index}
            onClick={() => setPage(index + 1)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button onClick={nextpage}>
        <MdOutlineSkipNext />
      </button>
    </div>
  );
};

export default Pagination;

import React from "react";

import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

import "../styles/Pagination.css";

const Pagination = ({ recipes, currentPage, updatePage, lastPage }) => {
  if (recipes.length) {
    return (
      <div className="results__pages">
        {currentPage > 1 && (
          <button
            className="btn-inline results__btn--prev"
            onClick={() => updatePage(-1)}
          >
            <GoTriangleLeft />
            <span>Page {currentPage - 1}</span>
          </button>
        )}

        {currentPage < lastPage && (
          <button
            className="btn-inline results__btn--next"
            onClick={() => updatePage(1)}
          >
            <span>Page {currentPage + 1}</span>
            <GoTriangleRight />
          </button>
        )}
      </div>
    );
  }
  return null;
};

export default Pagination;

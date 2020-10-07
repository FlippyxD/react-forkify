import React, { useState } from "react";

import Pagination from "./Pagination";
import ResultsItem from "./ResultsItem";

import { HiRefresh } from "react-icons/hi";

import "../styles/ResultsList.css";

const ResultsList = ({ recipes, isLoading, showDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);

  //Variables needed for pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const lastPage = Math.ceil(recipes.length / recipesPerPage);

  const updatePage = (index) => {
    setCurrentPage(currentPage + index);
  };

  if (isLoading) {
    return (
      <div className="loader">
        <HiRefresh />
      </div>
    );
  }

  return (
    <div className="results">
      <ul className="results__list">
        {recipes.slice(indexOfFirstRecipe, indexOfLastRecipe).map((recipe) => {
          return (
            <ResultsItem
              key={recipe.recipe_id}
              id={recipe.recipe_id}
              imgSrc={recipe.image_url}
              title={recipe.title}
              publisher={recipe.publisher}
              showDetail={showDetail}
            />
          );
        })}
      </ul>

      <Pagination
        recipes={recipes}
        currentPage={currentPage}
        lastPage={lastPage}
        updatePage={updatePage}
      />
    </div>
  );
};

export default ResultsList;

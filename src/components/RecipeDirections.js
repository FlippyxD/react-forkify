import React from "react";

import { GoTriangleRight } from "react-icons/go";

import "../styles/RecipeDirections.css";

const RecipeDirections = ({ recipeDetail }) => {
  //Aditional destructuring
  const { publisher, source_url } = recipeDetail;

  return (
    <div className="recipe__directions">
      <h2 className="heading-2">How to cook it</h2>
      <p className="recipe__directions-text">
        This recipe was carefully designed and tested by&nbsp;
        <span className="recipe__by">{publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        className="btn-small recipe__btn"
        href={source_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Directions</span>
        <GoTriangleRight />
      </a>
    </div>
  );
};

export default RecipeDirections;

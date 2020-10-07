import React from "react";

import "../styles/RecipeDetailHeading.css";

const RecipeDetailHeading = ({ recipeDetail }) => {
  const { image_url, title } = recipeDetail;

  if (recipeDetail) {
    return (
      <figure className="recipe__fig">
        <img src={image_url} alt="Tomato" className="recipe__img" />
        <h1 className="recipe__title">
          <span>{title}</span>
        </h1>
      </figure>
    );
  }
};

export default RecipeDetailHeading;

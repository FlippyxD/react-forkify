import React, { useState } from "react";

import RecipeDetailHeading from "./RecipeDetailHeading";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDirections from "./RecipeDirections";

import "../styles/RecipeDetail.css";

const RecipeDetail = ({
  recipeDetail,
  ingredients,
  time,
  setShoppingList,
  liked,
  setLiked,
}) => {
  const [servings, setServings] = useState(4);

  //Adjust shopping list
  const getShoppingListData = () => {
    setShoppingList(ingredients);
  };

  if (!ingredients.length) {
    return <div className="recipe"></div>;
  }
  return (
    <div className="recipe">
      <RecipeDetailHeading recipeDetail={recipeDetail} />

      <RecipeDetails
        ingredients={ingredients}
        time={time}
        servings={servings}
        recipeDetail={recipeDetail}
        setServings={setServings}
        liked={liked}
        setLiked={setLiked}
      />

      <RecipeIngredients
        ingredients={ingredients}
        servings={servings}
        getShoppingListData={getShoppingListData}
      />

      <RecipeDirections recipeDetail={recipeDetail} />
    </div>
  );
};

export default RecipeDetail;

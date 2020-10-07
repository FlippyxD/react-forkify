import React from "react";

import IngredientsItem from "./IngredientsItem";

import { FaShoppingCart } from "react-icons/fa";

import "../styles/RecipeIngredients.css";

const RecipeIngredients = ({ ingredients, servings, getShoppingListData }) => {
  const handleShoppingList = (data) => {
    getShoppingListData(data);
  };
  return (
    <div className="recipe__ingredients">
      <ul className="recipe__ingredient-list">
        {ingredients.map((item, idx) => {
          return (
            <IngredientsItem
              key={idx}
              count={item.count}
              unit={item.unit}
              ingredient={item.ingredient}
              servings={servings}
            />
          );
        })}
      </ul>

      <button
        className="btn-small recipe__btn"
        onClick={() => handleShoppingList()}
      >
        <FaShoppingCart className="search__icon" />
        <span>Add to shopping list</span>
      </button>
    </div>
  );
};

export default RecipeIngredients;

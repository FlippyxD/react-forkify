import React from "react";

import { FaRegHeart } from "react-icons/fa";
import { IoIosBody } from "react-icons/io";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { MdTimer } from "react-icons/md";

import "../styles/RecipeDetails.css";

const RecipeDetails = ({
  time,
  servings,
  setServings,
  liked,
  setLiked,
  recipeDetail,
}) => {
  //Adjust ingrdients needed for selected recipe based of servings
  const adjustServings = (num) => {
    if (servings <= 0 && num < 0) return 0;
    setServings(servings + num);
  };

  //SetLikes
  const addToLiked = (item) => {
    setLiked([...liked, item]);
  };

  return (
    <div className="recipe__details">
      <div className="recipe__info">
        <MdTimer className="recipe__info-icon" />
        <span className="recipe__info-data recipe__info-data--minutes">
          {time}
        </span>
        <span className="recipe__info-text"> minutes</span>
      </div>

      <div className="recipe__info">
        <IoIosBody className="recipe__info-icon" />
        <span className="recipe__info-data recipe__info-data--people">
          {servings}
        </span>
        <span className="recipe__info-text"> servings</span>
        <div className="recipe__info-buttons">
          <button className="btn-tiny" onClick={() => adjustServings(-1)}>
            <AiFillMinusCircle />
          </button>
          <button className="btn-tiny" onClick={() => adjustServings(+1)}>
            <AiFillPlusCircle />
          </button>
        </div>
      </div>
      <button className="recipe__love" onClick={() => addToLiked(recipeDetail)}>
        <FaRegHeart className="header__likes" />
      </button>
    </div>
  );
};

export default RecipeDetails;

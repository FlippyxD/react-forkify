import React from "react";

import LikeItem from "./LikeItem";

import { FaHeart } from "react-icons/fa";

import "../styles/Likes.css";

const Likes = ({ liked, showDetail }) => {
  //Prevent double entry of the same recipe in liked list
  let alreadyLiked = Array.from(new Set(liked.map((likedItem) => likedItem)));

  return (
    <div className="likes">
      <div className="likes__field">
        <FaHeart className="likes__icon" />
      </div>

      <div className="likes__panel">
        <ul className="likes__list">
          {alreadyLiked.map((recipe) => {
            return (
              <LikeItem
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
      </div>
    </div>
  );
};

export default Likes;

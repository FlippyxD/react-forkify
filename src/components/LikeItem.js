import React from "react";

import "../styles/LikeItem.css";

const LikeItem = ({ id, imgSrc, title, publisher, showDetail }) => {
  return (
    <li onClick={() => showDetail(id)}>
      <a className="likes__link" href="#23456">
        <figure className="likes__fig">
          <img src={imgSrc} alt={title} />
        </figure>
        <div className="likes__data">
          <h4 className="likes__name">{title}</h4>
          <p className="likes__author">{publisher}</p>
        </div>
      </a>
    </li>
  );
};

export default LikeItem;

import React, { useState } from "react";

import "../styles/ResultsItem.css";

const ResultsItem = ({ id, imgSrc, title, publisher, showDetail }) => {
  const [activeItemId, setActiveItemId] = useState("");

  //Onclick send request to fetch recipe detail
  const handleDetail = (id) => {
    showDetail(id);
    activeItem(id);
  };

  const activeItem = (id) => {
    setActiveItemId(id);
  };

  let className =
    activeItemId === id
      ? "results__link results__link--active"
      : "results__link ";

  return (
    <li
      onClick={() => {
        handleDetail(id);
      }}
    >
      <a className={className} href={`#${id}`}>
        <figure className="results__fig">
          <img src={imgSrc} alt="" />
        </figure>
        <div className="results__data">
          <h4 className="results__name">{title}</h4>
          <p className="results__author">{publisher}</p>
        </div>
      </a>
    </li>
  );
};

export default ResultsItem;

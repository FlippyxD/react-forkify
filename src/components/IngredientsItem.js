import React from "react";
import { Fraction } from "fractional";

import { GoCheck } from "react-icons/go";

import "../styles/IngredientsItem.css";

const formatCount = (count, servings) => {
  if (count) {
    const newCount = (Math.round(count * 10000) / 10000 / 4) * servings;
    const [int, dec] = newCount
      .toString()
      .split(".")
      .map((el) => parseInt(el, 10));

    if (!dec) return newCount;

    if (int === 0) {
      const fr = new Fraction(newCount);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(newCount - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return "";
};

const IngredientsItem = ({ count, unit, ingredient, servings }) => {
  return (
    <li className="recipe__item">
      <GoCheck className="recipe__icon" />
      <div className="recipe__count">{formatCount(count, servings)}</div>
      <div className="recipe__ingredient">
        <span className="recipe__unit">{unit} </span>
        {ingredient}
      </div>
    </li>
  );
};

export default IngredientsItem;

import React from "react";

import { TiDelete } from "react-icons/ti";

import "../styles/Ingredient.css";

const Ingredient = ({ id, value, unit, description, deleteItem }) => {
  const handleDelete = (id) => {
    deleteItem(id);
  };
  return (
    <li className="shopping__item">
      <div className="shopping__count">
        <input type="number" defaultValue={value || 1} step="1" />
        <p>{unit}</p>
      </div>
      <p className="shopping__description">{description}</p>
      <button
        className="shopping__delete btn-tiny"
        onClick={() => handleDelete(id)}
      >
        <TiDelete />
      </button>
    </li>
  );
};

export default Ingredient;

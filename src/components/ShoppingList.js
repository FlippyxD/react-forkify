import React from "react";

import Ingredient from "./Ingredient";

const ShoppingList = ({ shoppingList, setShoppingList }) => {
  //Deletes item from shopping list
  const deleteItem = (id) => {
    setShoppingList(
      [...shoppingList].filter((ingredient) => id !== ingredient.id)
    );
  };

  if (!shoppingList.length) {
    return (
      <div className="shopping">
        <h2 className="heading-2">My Shopping List</h2>
      </div>
    );
  }

  return (
    <div className="shopping">
      <h2 className="heading-2">My Shopping List</h2>

      <ul className="shopping__list">
        {shoppingList.map((item, idx) => {
          return (
            <Ingredient
              key={item.id}
              id={item.id}
              value={item.count}
              unit={item.unit}
              description={item.ingredient}
              deleteItem={deleteItem}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ShoppingList;

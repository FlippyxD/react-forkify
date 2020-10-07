import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import ResultsList from "./components/ResultsList";
import RecipeDetail from "./components/RecipeDetail";
import ShoppingList from "./components/ShoppingList";
// import { parseIngredients } from "./parseIngredients";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  //Get liked recipes from localStorage
  const savedLikedRecipes = JSON.parse(window.localStorage.getItem("liked"));

  //Initial states
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("pizza");

  const [isLoading, setIsLoading] = useState(false);

  const [recipeDetail, setRecipeDetail] = useState([]);

  const [time, setTime] = useState(0);

  const [ingredients, setIngredients] = useState([]);

  const [shoppingList, setShoppingList] = useState([]);

  const [liked, setLiked] = useState(savedLikedRecipes || []);

  //Runs only when searchQuery has been updated
  useEffect(() => {
    search(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const numIng = ingredients.length;
    const periods = Math.ceil(numIng / 3);
    setTime(periods * 15);
  }, [ingredients]);

  //Callback that fires every time, that liked array is changed
  useEffect(() => {
    //Prevent double entry of the same recipe in liked list
    let alreadyLiked = Array.from(new Set(liked.map((likedItem) => likedItem)));

    //Save liked recipe to localStorage
    const syncLocalStorage = () => {
      window.localStorage.setItem("liked", JSON.stringify(alreadyLiked));
    };

    syncLocalStorage();
  }, [liked]);

  //Fetch the left sidebar data for query
  const search = async (query) => {
    //Show loading spinner
    setIsLoading(true);

    //Fetch data if there is query
    if (query) {
      //For succesfull calls
      try {
        const searchResult = await axios(
          `https://forkify-api.herokuapp.com/api/search?q=${query}`
        );
        //Save results in recipes variable
        const recipes = searchResult.data.recipes;
        //update recipes state
        setRecipes(recipes);
      } catch (err) {
        //If there is error, alert it
        alert(
          `Query not found. Please check https://forkify-api.herokuapp.com/phrases.html for all of the availible search queries.`
        );
      }
    }

    //Hide spinner
    setIsLoading(false);
  };

  //Set searchText to value in input field after each keypress
  const updateSearch = (e) => {
    //Set useState value for searchText
    setSearchText(e.target.value);
  };

  //On form submit send request to API
  const getSearch = (e) => {
    //Prevent refresh of the page
    e.preventDefault();

    //Update searchQuery which initiates useEffect
    setSearchQuery(searchText);

    //Set input value to empty string
    setSearchText("");
  };

  const showDetail = async (id) => {
    const searchResultDetail = await axios(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    const recipeDetail = searchResultDetail.data.recipe;

    setRecipeDetail(recipeDetail);

    let ingredients = recipeDetail.ingredients;

    // parseIngredients(ingredients);

    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];
    const units = [...unitsShort, "kg", "g"];

    const newIngredients = ingredients.map((el) => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // 3) Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
        // Ex. 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" "),
          id: uuidv4(),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" "),
          id: uuidv4(),
        };
      } else if (unitIndex === -1) {
        // There is NO unit and NO number in 1st position
        objIng = {
          count: 1,
          unit: "",
          ingredient,
          id: uuidv4(),
        };
      }

      return objIng;
    });

    ingredients = newIngredients;
    setIngredients(ingredients);
  };

  return (
    <div className="container">
      <Header
        searchText={searchText}
        updateSearch={updateSearch}
        getSearch={getSearch}
        liked={liked}
        showDetail={showDetail}
      />

      <ResultsList
        recipes={recipes}
        isLoading={isLoading}
        showDetail={showDetail}
      />

      <RecipeDetail
        time={time}
        recipeDetail={recipeDetail}
        ingredients={ingredients}
        shoppingList={shoppingList}
        setShoppingList={setShoppingList}
        liked={liked}
        setLiked={setLiked}
      />

      <ShoppingList
        shoppingList={shoppingList}
        setShoppingList={setShoppingList}
      />
    </div>
  );
}

export default App;

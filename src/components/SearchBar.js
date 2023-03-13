import React, { useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import MealsRecipes from '../pages/MealsRecipes';
import DrinksRecipes from '../pages/DrinksRecipes';
import '../styles/SearchBar.css';

import {
  fetchMealsByIngredient,
  fetchDrinksByIngredient,
  fetchMealsByName,
  fetchDrinksByName,
  fetchMealsByLetter,
  fetchDrinksByLetter,
} from '../services/fetchAPI';

function SearchBar() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const id = path.includes('/meals') ? 'idMeal' : 'idDrink';
  const {
    filter,
    setFilter,
    searchInput,
    setSearchInput,
    setRender,
  } = useContext(LoginContext);

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const handleChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const handleSearch = async (type, search) => {
    try {
      const results = await search(searchInput);
      setRender(results);
      if (results?.[type]) {
        const [firstResult] = results[type];
        if (results[type].length === 1 && firstResult[id]) {
          history.push(`${path}/${firstResult[id]}`);
        }
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } catch (error) {
      console.error(error);
      global.alert('An error occurred. Please try again later.');
    }
  };

  const handleSearchButton = async () => {
    if (path.includes('/meals')) {
      switch (filter) {
      case 'ingredients':
        await handleSearch('meals', fetchMealsByIngredient);
        break;
      case 'name':
        await handleSearch('meals', fetchMealsByName);
        break;
      case 'firstLetter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          await handleSearch('meals', fetchMealsByLetter);
        }
        break;
      default:
        break;
      }
    } else {
      switch (filter) {
      case 'ingredients':
        await handleSearch('drinks', fetchDrinksByIngredient);
        break;
      case 'name':
        await handleSearch('drinks', fetchDrinksByName);
        break;
      case 'firstLetter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          await handleSearch('drinks', fetchDrinksByLetter);
        }
        break;
      default:
        break;
      }
    }
  };

  return (
    <section>
      <div className="search-bar-container">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search"
          onChange={ handleChange }
          className="search-input"
        />
        <div className="categorys">
          <label htmlFor="ingredient">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              id="ingredient"
              value="ingredients"
              name="sort"
              onClick={ handleFilter }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              data-testid="name-search-radio"
              type="radio"
              id="name"
              value="name"
              name="sort"
              onClick={ handleFilter }
            />
            Name
          </label>
          <label htmlFor="first-letter">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              id="first-letter"
              value="firstLetter"
              name="sort"
              onClick={ handleFilter }
            />
            First Letter
          </label>
        </div>

        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleSearchButton }
        >
          Search
        </button>
      </div>

      <MealsRecipes />
      <DrinksRecipes />
    </section>
  );
}

export default SearchBar;

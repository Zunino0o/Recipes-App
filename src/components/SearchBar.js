import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
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
  const {
    filter,
    setFilter,
    searchInput,
    setSearchInput,
  } = useContext(LoginContext);

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const handleChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const handleMeals = () => {
    switch (filter) {
    case 'ingredients':
      fetchMealsByIngredient(searchInput);
      break;
    case 'name':
      fetchMealsByName(searchInput);
      break;
    case 'firstLetter':
      fetchMealsByLetter(searchInput);
      if (filter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
    }
  };

  const handleDrinks = () => {
    switch (filter) {
    case 'ingredients':
      fetchDrinksByIngredient(searchInput);
      break;
    case 'name':
      fetchDrinksByName(searchInput);
      break;
    case 'firstLetter':
      fetchDrinksByLetter(searchInput);
      if (filter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
    }
  };

  return (
    <section>
      <div>
        <div>
          <input
            data-testid="search-input"
            type="text"
            placeholder="Search"
            onChange={ handleChange }
          />
        </div>
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
        onClick={ () => {
          if (history.location.pathname === '/meals') {
            handleMeals();
          } handleDrinks();
        } }
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;

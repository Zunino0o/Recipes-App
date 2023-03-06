import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';
// import {
//   fetchMealsByIngredient,
//   fetchDrinksByIngredient,
//   fetchMealsByName,
//   fetchDrinksByName,
//   fetchMealsByLetter,
//   fetchDrinksByLetter,
// } from '../services/fetchAPI';

function SearchBar() {
  const { handleFilter } = useContext(LoginContext);
  return (
    <section>
      <div>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            name="search_filter"
            type="radio"
            id="ingredient"
            value="Ingredient"
            onClick={ handleFilter }
          />
          Ingredient
        </label>
        <label htmlFor="name-search">
          <input
            data-testid="name-search-radio"
            name="search_filter"
            type="radio"
            id="name-search"
            value="Name"
            onClick={ handleFilter }
          />
          Name
        </label>
        <label htmlFor="first-letter-search">
          <input
            data-testid="first-letter-search-radio"
            name="search_filter"
            type="radio"
            id="first-letter-search"
            value="First Letter"
            onClick={ handleFilter }
          />
          First Letter
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;

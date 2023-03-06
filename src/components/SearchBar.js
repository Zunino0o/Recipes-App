import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';
import {
  fetchMealsByIngredient,
  // fetchDrinksByIngredient,
  fetchMealsByName,
  // fetchDrinksByName,
  fetchMealsByLetter,
  // fetchDrinksByLetter,
} from '../services/fetchAPI';

function SearchBar() {
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

  const handleSearch = () => {
    switch (filter) {
    case 'ingredients':
      fetchMealsByIngredient(searchInput);
      break;
    case 'name':
      fetchMealsByName(searchInput);
      break;
    case 'firstLetter':
      // if (filter.length > 1) {
      //    global.alert('Your search must have only 1 (one) character');
      // }
      fetchMealsByLetter(searchInput);
      break;
    default:
    }
  };

  // const handleDrinks = async () => {
  //   switch (ingredientsFilter) {
  //     case 'ingredients':
  //       await fetchDrinksByIngredient(searchInput);
  //   }
  //   switch (nameFilter) {
  //     case 'name':
  //       await fetchDrinksByName(searchInput);
  //   }
  //   switch (letterFilter) {
  //     case letterFilter.length > 1:
  //       global.alert('Your search must have only 1 (one) character');
  //       break;
  //     case 'firstLetter':
  //       await fetchDrinksByLetter(searchInput);
  //   }
  // };

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
            value="firstletter"
            name="sort"
            onClick={ handleFilter }
          />
          First Letter
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;

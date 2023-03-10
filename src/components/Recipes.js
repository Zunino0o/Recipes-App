import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import { getRecipesCategoriesFiltered } from '../services/fetchAPI';

function Recipes() {
  const {
    recipes,
    type,
    btnsCategory,
    setRecipesArray,
    recipesArray,
  } = useContext(LoginContext);
  const number12 = 12;
  const number5 = 5;
  const [filter, setFilter] = useState('');
  const recipeType = type === 'meals' ? 'Meal' : 'Drink';

  const handleClick = async (e) => {
    // const { name } = target;
    setFilter(e);
    if (e === filter) {
      setRecipesArray([]);
      setFilter('');
      console.log(filter);
    } else {
      const filteredList = await getRecipesCategoriesFiltered(type, e);
      setRecipesArray(filteredList);
      // console.log(filteredList);
      // console.log(e);
    }
  };

  const handleClickAll = async () => {
    // console.log(type);
    // const allRecipes = await getRecipes(type);
    setRecipesArray([]);
    console.log(recipes);
  };

  const recipesFinal = recipesArray.length === 0 ? recipes : recipesArray;

  return (
    <div>
      {btnsCategory.map((e, index) => (index < number5 && (
        <button
          type="button"
          key={ e.strCategory }
          name={ e.strCategory }
          data-testid={ `${e.strCategory}-category-filter` }
          onClick={ () => handleClick(e.strCategory) }
        >
          {e.strCategory}
        </button>
      )))}
      <button
        type="button"
        name="all"
        onClick={ handleClickAll }
        data-testid="All-category-filter"
      >
        All
      </button>

      {recipeType === 'Meal'
        ? recipesFinal.map((e, index) => (
          index < number12 && (
            <Link
              key={ index }
              to={ `/meals/${e.idMeal}` }
            >
              <li
                key={ e.id }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  alt={ e.strMeal }
                  data-testid={ `${index}-card-img` }
                  src={ e.strMealThumb }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {e.strMeal}

                </p>
              </li>
            </Link>
          )
        ))
        : recipesFinal.map((e, index) => (
          index < number12 && (
            <Link
              key={ index }
              to={ `/drinks/${e.idDrink}` }
            >
              <li
                key={ e.id }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  alt={ e.strDrink }
                  data-testid={ `${index}-card-img` }
                  src={ e.strDrinkThumb }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {e.strDrink}

                </p>
              </li>
            </Link>
          )
        ))}
    </div>
  );
}

export default Recipes;

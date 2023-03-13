import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import { getRecipesCategoriesFiltered } from '../services/fetchAPI';
import '../styles/Recipes.css';

function Recipes() {
  const {
    recipes,
    type,
    btnsCategory,
    setRecipesArray,
    recipesArray,
  } = useContext(LoginContext);

  const [recipesFinal, setRecipesFinal] = useState([]);

  const number12 = 12;
  const number5 = 5;
  const [categoryFilter, setCategoryFilter] = useState('');
  const recipeType = type === 'meals' ? 'Meal' : 'Drink';
  const handleClick = async (e) => {
    // const { name } = target;
    setCategoryFilter(e);
    if (e === categoryFilter) {
      setRecipesArray([]);
      setCategoryFilter('');
      // console.log(filter);
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

  // console.log(recipesArray);
  // const { length } = recipesArray;
  // const recipesFinal = length === 0 ? recipes : recipesArray;
  // const recipesFinalAlmost = recipesArray.length === 0 ? recipes : recipesArray;
  // setRecipesFinal(recipesFinalAlmost);
  const recipesFinalAlmost = recipesArray.length === 0 ? recipes : recipesArray;
  // console.log(recipesFinal);

  // console.log(length);
  useEffect(() => {
    setRecipesFinal(recipesFinalAlmost);
    // console.log(recipesArray);
  });

  return (
    <div className="recipes-container">
      <div className="category-btn" data-testid="recipes">
        {btnsCategory?.map(
          (e, index) => index < number5 && (
            <button
              type="button"
              key={ e.strCategory }
              name={ e.strCategory }
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ () => handleClick(e.strCategory) }
            >
              {e.strCategory}
            </button>
          ),
        )}
        <button
          type="button"
          name="all"
          onClick={ handleClickAll }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>

      <div className="recipe-list">
        {recipeType === 'Meal'
          ? recipesFinal.map(
            (e, index) => index < number12 && (
              <Link key={ index } to={ `/meals/${e.idMeal}` }>
                <div
                  key={ e.id }
                  data-testid={ `${index}-recipe-card` }
                  className="recipe-item"
                >
                  <img
                    alt={ e.strMeal }
                    data-testid={ `${index}-card-img` }
                    src={ e.strMealThumb }
                  />
                  <p data-testid={ `${index}-card-name` }>{e.strMeal}</p>
                </div>
              </Link>
            ),
          )
          : recipesFinal.map(
            (e, index) => index < number12 && (
              <Link key={ index } to={ `/drinks/${e.idDrink}` }>
                <div
                  key={ e.id }
                  data-testid={ `${index}-recipe-card` }
                  className="recipe-item"
                >
                  <img
                    alt={ e.strDrink }
                    data-testid={ `${index}-card-img` }
                    src={ e.strDrinkThumb }
                  />
                  <p data-testid={ `${index}-card-name` }>{e.strDrink}</p>
                </div>
              </Link>
            ),
          )}
      </div>
    </div>
  );
}

export default Recipes;

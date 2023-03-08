import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

function Recipes() {
  const { recipes, type } = useContext(LoginContext);
  const number12 = 12;
  const recipeType = type === 'meals' ? 'Meal' : 'Drink';
  return (
    <div>
      {recipeType === 'Meal'
        ? recipes.map((e, index) => (
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
        : recipes.map((e, index) => (
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

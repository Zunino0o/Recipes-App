import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';

const MAX_MEALS = 12;

function MealsRecipes() {
  const { render } = useContext(LoginContext);
  const meals = render?.meals?.slice(0, MAX_MEALS);

  return (
    <div>
      {
        meals?.map((item, index) => (
          <div
            key={ item.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <span
              data-testid={ `${index}-card-name` }
            >
              {item.strMeal}
            </span>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
          </div>
        ))
      }
    </div>
  );
}

export default MealsRecipes;

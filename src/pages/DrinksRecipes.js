import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';

const MAX_DRINKS = 12;

function DrinksRecipes() {
  const { render } = useContext(LoginContext);
  const drinks = render?.drinks?.slice(0, MAX_DRINKS);

  return (
    <div>
      {
        drinks?.map((item, index) => (
          <div
            key={ item.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <span
              data-testid={ `${index}-card-name` }
            >
              { item.strDrink }
            </span>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
          </div>
        ))
      }
    </div>
  );
}

export default DrinksRecipes;

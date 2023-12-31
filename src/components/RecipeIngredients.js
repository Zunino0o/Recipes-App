import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FinishButton from './FinishButton';

function RecipeIngredients({ recipe }) {
  const ingredients = [];
  const measures = [];
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    let storageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageRecipes === null) storageRecipes = [];
    setSelectedIngredients(storageRecipes);
  }, []);

  useEffect(() => {
    if (ingredients.length === selectedIngredients.length) {
      setIsFinish(true);
    } else {
      setIsFinish(false);
    }
  }, [selectedIngredients, ingredients.length]);

  function handleCheck(ingredient) {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== ingredient),
      );
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(
          selectedIngredients.filter((item) => item !== ingredient),
        ),
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify([...selectedIngredients, ingredient]),
      );
    }
  }

  Object.keys(recipe).forEach((key) => {
    if (key.startsWith('strIngredient')) {
      const ingredient = recipe[key];
      if (ingredient !== '' && ingredient !== null) {
        ingredients.push(ingredient);
      }
    }
    if (key.startsWith('strMeasure')) {
      let measure = recipe[key];
      if (measure == null) {
        measure = '';
      }
      measures.push(measure);
    }
  });

  return (
    <div>
      <ul className="ingredients">
        {ingredients.map((ingredient, index) => (
          <li key={ index }>
            <div
              data-testid={ `${index}-ingredient-step` }
              className={
                selectedIngredients.includes(ingredient) ? 'select' : ''
              }
            >
              <input
                type="checkbox"
                id={ ingredient }
                name={ ingredient }
                onChange={ () => handleCheck(ingredient) }
                checked={ selectedIngredients.includes(ingredient) }
              />
              <label htmlFor={ ingredient }>
                {measures[index]}
                {ingredient}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <FinishButton isFinish={ isFinish } recipe={ recipe } />
    </div>
  );
}

RecipeIngredients.propTypes = {
  recipe: PropTypes.oneOfType([]).isRequired,
};

export default RecipeIngredients;

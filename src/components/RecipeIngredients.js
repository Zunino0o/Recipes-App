import PropTypes from 'prop-types';

function RecipeIngredients({ recipe }) {
  const ingredients = [];
  const measures = [];
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
    <ul className="ingredientsList">
      {ingredients.map((ingredient, index) => (
        <li key={ index }>
          <div data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" id={ ingredient } name={ ingredient } />
            <label htmlFor={ ingredient }>
              {measures[index]}
              {ingredient}
            </label>
          </div>

          {/* <label data-testid={`${index}-ingredient-step`}>
            <input type="checkbox" />
            {measures[index]}
            {ingredient}
          </label> */}
        </li>
      ))}
    </ul>
  );
}

RecipeIngredients.propTypes = {
  recipe: PropTypes.oneOfType([]).isRequired,
};

export default RecipeIngredients;

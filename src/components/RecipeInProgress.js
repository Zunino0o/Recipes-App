import PropTypes from 'prop-types';
import RecipeIngredients from './RecipeIngredients';

function RecipeInProgress({ recipe, type }) {
  if (recipe === '') {
    return <h1>Carregando</h1>;
  }
  let receita = '';
  let category = '';
  let image = '';
  let title = '';

  if (type === 'meals') {
    [receita] = recipe.meals;
    title = receita.strMeal;
    category = receita.strCategory;
    image = receita.strMealThumb;
  } else {
    [receita] = recipe.drinks;
    title = receita.strDrink;
    category = receita.strAlcoholic;
    image = receita.strDrinkThumb;
  }

  const instructions = receita.strInstructions.split('.');
  return (
    <div>
      <h1 data-testid="recipe-title">{title}</h1>
      <p data-testid="recipe-category">{category}</p>
      <img src={ image } alt={ title } data-testid="recipe-photo" />
      <div data-testid="instructions">
        {instructions.map((item) => (
          <p key={ item }>{item}</p>
        ))}
      </div>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar
      </button>
      <RecipeIngredients recipe={ receita } />
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      meals: PropTypes.arrayOf(
        PropTypes.shape({
          strMeal: PropTypes.string.isRequired,
          strCategory: PropTypes.string.isRequired,
          strMealThumb: PropTypes.string.isRequired,
          strInstructions: PropTypes.string.isRequired,
        }),
      ),
      drinks: PropTypes.arrayOf(
        PropTypes.shape({
          strDrink: PropTypes.string.isRequired,
          strAlcoholic: PropTypes.string.isRequired,
          strDrinkThumb: PropTypes.string.isRequired,
          strInstructions: PropTypes.string.isRequired,
        }),
      ),
    }),
  ]).isRequired,
  type: PropTypes.oneOf(['meals', 'drinks']).isRequired,
};

export default RecipeInProgress;

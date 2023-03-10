import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

function CardDoneRecipe({ recipe, index }) {
  const { type } = recipe;
  const url = window.location.href;
  const editURL = url.replace('/done-recipes', `/${recipe.type}s/${recipe.id}`);

  return (
    <div className="cardDoneRecipe">
      <a href={ editURL }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          className="horizontal-image"
        />
        <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
      </a>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'meal'
          ? `${recipe.nationality} - ${recipe.category}`
          : recipe.alcoholicOrNot}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      {recipe.tags.map((tag) => (
        <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ index }>
          {tag}
        </p>
      ))}
      <ShareButton url={ editURL } dataTestid={ `${index}-horizontal-share-btn` } />
    </div>
  );
}

CardDoneRecipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardDoneRecipe;

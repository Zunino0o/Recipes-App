import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

function CardDoneRecipe({ recipe, index }) {
  const { type } = recipe;
  const url = window.location.href;

  if (type === 'meal') {
    return (
      <div>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
        <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.nationality} - ${recipe.category}`}
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
        {recipe.tags.map((tag) => (
          <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ index }>
            {tag}
          </p>
        ))}
        <ShareButton
          url={ url.replace('/done-recipes', `/${recipe.type}s/${recipe.id}`) }
          dataTestid={ `${index}-horizontal-share-btn` }
        />
      </div>
    );
  }
  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
      />
      <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {recipe.alcoholicOrNot}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      {recipe.tags.map((tag) => (
        <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ index }>
          {tag}
        </p>
      ))}
      <ShareButton
        url={ url.replace('/done-recipes', `/${recipe.type}s/${recipe.id}`) }
        dataTestid={ `${index}-horizontal-share-btn` }
      />
    </div>
  );
}

CardDoneRecipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.string.isRequired,
};

export default CardDoneRecipe;

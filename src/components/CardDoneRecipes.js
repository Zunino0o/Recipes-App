import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

function CardDoneRecipes({ recipes }) {
  const url = window.location.href;
  console.log(recipes);
  return (
    <div>
      {recipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.categoy}</p>
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
      ))}
    </div>
  );
}

CardDoneRecipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      doneDate: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

export default CardDoneRecipes;

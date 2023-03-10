import React from 'react';
import PropTypes from 'prop-types';

function RecommendationCard({ recommendations }) {
  const visibleRecipes = 2;

  return (
    <div data-testid="recommendation-card">
      {recommendations.slice(0, visibleRecipes).map((recipe, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recommendation-card` }
        >
          <h3 data-testid={ `${index}-recommendation-title` }>{recipe.title}</h3>
          <img src={ recipe.thumbnail } alt={ recipe.title } />
        </div>
      ))}
    </div>
  );
}

RecommendationCard.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RecommendationCard;

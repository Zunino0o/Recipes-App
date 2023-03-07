import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ recipe, index }) {
  const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
  console.log(recipe, index);
  return (
    <div id={ id }>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <span data-testid={ `${index}-horizontal-name` }>{ name }</span>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {
          type === 'drink'
            ? `${alcoholicOrNot} - ${category}`
            : `${nationality} - ${category}`
        }
      </p>

      <button
        id="share-btn"
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      />

      <button
        id="favorite-btn"
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
      />

    </div>
  );
}

export default FavoriteCard;

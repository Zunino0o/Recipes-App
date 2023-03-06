import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard(recipe) {
  const { category, name, image, index } = recipe;
  return (
    <section>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <span data-testid={ `${index}-horizontal-name` }>{ name }</span>
      <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
      >
        <img src={ blackHeartIcon } alt="desfavoritar" />
      </button>
    </section>
  );
}

export default FavoriteCard;

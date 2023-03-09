import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteCard.css';

function FavoriteCard({ recipe, index, handler }) {
  const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
  // console.log(recipe, index);

  const [alert, setAlert] = useState('');

  const handleShare = () => {
    const TIME = 3000;
    const clipboardText = `http://localhost:3000/${type}s/${id}`;
    // console.log(clipboardText);
    navigator.clipboard.writeText(clipboardText);
    setAlert('Link copied!');
    setTimeout(() => {
      setAlert('');
    }, TIME);
  };

  const handleFav = () => {
    const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavRecipes = localStorageData.filter((fil) => fil.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    handler(newFavRecipes);
  };

  return (
    <div id={ id } data-testid="favorite-card">
      <a href={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="foodImage"
        />
      </a>
      <a href={ `/${type}s/${id}` }>
        <span data-testid={ `${index}-horizontal-name` }>{ name }</span>
      </a>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          type === 'drink'
            ? `${alcoholicOrNot} - ${category}`
            : `${nationality} - ${category}`
        }
      </p>
      <br />
      {alert}
      <br />
      <button
        id="share-btn"
        type="button"
        onClick={ handleShare }
      >
        <img
          src={ shareIcon }
          alt="Share Button"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <button
        id="favorite-btn"
        type="button"
        onClick={ handleFav }
      >
        <img
          src={ blackHeartIcon }
          alt="Favorite Button"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>

    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};

export default FavoriteCard;

import React, { useState } from 'react';
// import useClipboard from 'react-copy-to-clipboard';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ recipe, index, handler }) {
  const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
  // console.log(recipe, index);

  const [alert, setAlert] = useState('');
  // const [clipboard, copyToClipboard] = useClipboard();

  const handleShare = () => {
    const TIME = 3000;
    const clipboardText = `http://localhost:3000/${type}s/${id}`;
    console.log(clipboardText);
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
      <br />
      {alert}
      <br />
      <button
        id="share-btn"
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ handleShare }
      />

      <button
        id="favorite-btn"
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        onClick={ handleFav }
      />

    </div>
  );
}

export default FavoriteCard;

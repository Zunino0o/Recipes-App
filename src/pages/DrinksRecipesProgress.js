import { useState, useEffect } from 'react';
import FavoriteButton from '../components/FavoriteButton';
import RecipeInProgress from '../components/RecipeInProgress';
import ShareButton from '../components/ShareButton';
import fetchRecipeId from '../services/fetchRecipeId';
import '../styles/RecipesProgress.css';

function DrinksRecipesProgress() {
  const type = window.location.pathname.split('/')[1];
  const recipeID = window.location.pathname.split('/')[2];
  const [recipe, setRecipe] = useState('');

  // const teste = 15997;

  useEffect(() => {
    async function fetch() {
      setRecipe(await fetchRecipeId(recipeID, type));
    }
    fetch();
  }, []);

  return (
    <div>
      <h1>Drinks Receita Progress</h1>
      <RecipeInProgress type={ type } recipe={ recipe } />
      <ShareButton />
      <FavoriteButton recipe={ recipe[type] } />
    </div>
  );
}

export default DrinksRecipesProgress;

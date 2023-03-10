import { useState, useEffect } from 'react';
import RecipeInProgress from '../components/RecipeInProgress';
import fetchRecipeId from '../services/fetchRecipeId';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import '../styles/RecipesProgress.css';

function MealsRecipesProgress() {
  const url = window.location.href.replace('/in-progress', '');
  const type = url.split('/')[3];
  const recipeID = url.split('/')[4];
  const [recipe, setRecipe] = useState('');
  // const teste = 52977;

  useEffect(() => {
    async function fetch() {
      setRecipe(await fetchRecipeId(recipeID, type));
    }
    fetch();
  }, []);

  return (
    <div>
      <h1>Meals Receita Progress</h1>
      <RecipeInProgress type={ type } recipe={ recipe } />
      <ShareButton url={ url } dataTestid="share-btn" />
      <FavoriteButton recipe={ recipe[type] } />
    </div>
  );
}

export default MealsRecipesProgress;

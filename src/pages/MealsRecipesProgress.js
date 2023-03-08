import { useState, useEffect } from 'react';
import RecipeInProgress from '../components/RecipeInProgress';
import fetchRecipeId from '../services/fetchRecipeId';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import '../styles/RecipesProgress.css';

function MealsRecipesProgress() {
  const type = window.location.pathname.split('/')[1];
  const recipeID = window.location.pathname.split('/')[2];
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
      <ShareButton />
      <FavoriteButton recipe={ recipe[type] } />
    </div>
  );
}

export default MealsRecipesProgress;

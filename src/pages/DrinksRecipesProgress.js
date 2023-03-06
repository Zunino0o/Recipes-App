import { useState, useEffect } from 'react';
import RecipeInProgress from '../components/RecipeInProgress';
import fetchRecipeId from '../services/fetchRecipeId';

function DrinksRecipesProgress() {
  const type = window.location.pathname.split('/')[1];
  const recipeID = window.location.pathname.split('/')[2];
  const [recipe, setRecipe] = useState('');

  // const teste = 15997;

  useEffect(() => {
    async function fetch() {
      setRecipe(await fetchRecipeId(15997, type));
    }
    fetch();
  }, []);

  return (
    <div>
      <h1>Drinks Receita Progress</h1>
      <RecipeInProgress type={ type } recipe={ recipe } />
    </div>
  );
}

export default DrinksRecipesProgress;

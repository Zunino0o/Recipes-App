import { useState } from 'react';
import CardDoneRecipe from '../components/CardDoneRecipe';
import Header from '../components/Header';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  function applyFilter(filter) {
    if (filter) {
      setFilteredRecipes(recipes.filter((recipe) => recipe.type === filter));
    } else {
      setFilteredRecipes(recipes);
    }
  }

  return (
    <section>
      <Header pageTitle="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => applyFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => applyFilter('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => applyFilter('drink') }
        >
          Drinks
        </button>
        {filteredRecipes.map((recipe, index) => (
          <div key={ index }>
            <CardDoneRecipe recipe={ recipe } index={ index } />
          </div>
        ))}
      </div>
    </section>
  );
}
export default DoneRecipes;

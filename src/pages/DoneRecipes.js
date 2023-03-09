import CardDoneRecipe from '../components/CardDoneRecipe';
import Header from '../components/Header';

function DoneRecipes() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <section>
      <Header pageTitle="Done Recipes" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          Todos
        </button>
        <button type="button" data-testid="filter-by-meal-btn">
          Meals
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
        {recipes.map((recipe, index) => (
          <div key={ index }>
            <CardDoneRecipe recipe={ recipe } index={ index } />
          </div>
        ))}
      </div>
    </section>
  );
}
export default DoneRecipes;

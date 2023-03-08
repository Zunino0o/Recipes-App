import CardDoneRecipes from '../components/CardDoneRecipes';
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
        <CardDoneRecipes recipes={ recipes } />
      </div>
    </section>
  );
}
export default DoneRecipes;

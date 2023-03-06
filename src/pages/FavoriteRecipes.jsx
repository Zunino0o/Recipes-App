import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <section>
      <Header pageTitle="FavoriteRecipes" />

      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </section>
  );
}

export default FavoriteRecipes;

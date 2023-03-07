import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  // const favoriteRecipes = [{
  //   id: '11566',
  //   type: 'drink',
  //   nationality: null,
  //   category: 'Ordinary Drink',
  //   alcoholicOrNot: 'Alcoholic',
  //   name: 'Jewel Of The Nile',
  //   image: 'https://www.thecocktaildb.com/images/media/drink/hx4nrb1504884947.jpg',
  // },
  // {
  //   id: '52886',
  //   type: 'meal',
  //   nationality: 'British',
  //   category: 'Dessert',
  //   alcoholicOrNot: null,
  //   name: 'Spotted Dick',
  //   image: 'https://www.themealdb.com/images/media/meals/xqvyqr1511638875.jpg',
  // }];

  const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteRecipes = localStorageData || [];
  // console.log(favoriteRecipes);

  return (
    <section>
      <Header pageTitle="FavoriteRecipes" />

      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-meal-btn">
        Meals
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>

      <section>
        {favoriteRecipes.map((rec, index) => (
          <FavoriteCard key={ index } index={ index } recipe={ rec } />
        ))}
      </section>
    </section>
  );
}

export default FavoriteRecipes;

import { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [bool, setBool] = useState([]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setBool(favoriteRecipes);
  }, []);

  // const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const favoriteRecipes = localStorageData || [];
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
        {bool.map((rec, index) => (
          <FavoriteCard
            key={ index }
            index={ index }
            recipe={ rec }
            handler={ setBool }
          />
        ))}
      </section>
    </section>
  );
}

export default FavoriteRecipes;

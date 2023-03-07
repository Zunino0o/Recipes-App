import { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favRec, setFavRec] = useState([]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavRec(favoriteRecipes);
  }, []);

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
        {favRec.map((rec, index) => (
          <FavoriteCard
            key={ index }
            index={ index }
            recipe={ rec }
            handler={ setFavRec }
          />
        ))}
      </section>
    </section>
  );
}

export default FavoriteRecipes;

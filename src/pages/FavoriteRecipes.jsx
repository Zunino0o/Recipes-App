import { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const [favRec, setFavRec] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavRec(favoriteRecipes);
  }, []);

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  return (
    <section>
      <Header pageTitle="FavoriteRecipes" />

      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ handleFilter }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ handleFilter }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ handleFilter }
      >
        Drinks
      </button>

      <section>
        {favRec
          .filter((item) => {
            if (filter === 'all') {
              return item;
            }
            return item.type === filter;
          })
          .map((rec, index) => (
            <FavoriteCard
              key={ index }
              index={ index }
              recipe={ rec }
              handler={ setFavRec }
            />
          ))}
      </section>
      <Footer />
    </section>
  );
}

export default FavoriteRecipes;

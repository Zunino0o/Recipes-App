import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginContext from '../context/LoginContext';
import { getRecipes } from '../services/fetchAPI';
import Recipes from '../components/Recipes';

function Meals() {
  const { recipes, setType, setRecipes } = useContext(LoginContext);
  const getMeals = async (type) => {
    // console.log(type);
    const mealsList = await getRecipes(type);
    setRecipes(mealsList.meals);
    console.log(recipes);
    // console.log(type);
  };

  useEffect(() => {
    setType('meals');
    getMeals('meals');
  });
  return (
    <section>
      <Header pageTitle="Meals" />
      <Recipes />
      <Footer />
    </section>
  );
}
export default Meals;

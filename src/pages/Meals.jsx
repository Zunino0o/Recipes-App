import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import Buttons from '../components/Buttons';
import LoginContext from '../context/LoginContext';
import { getRecipes, getRecipesCategories } from '../services/fetchAPI';
import Recipes from '../components/Recipes';

function Meals() {
  const { setType, setRecipes, setBtnsCategory } = useContext(LoginContext);
  const getMeals = async (type) => {
    // console.log(type);
    const mealsList = await getRecipes(type);
    const mealsCategories = await getRecipesCategories(type);
    setRecipes(mealsList);
    setBtnsCategory(mealsCategories);
    // console.log(mealsCategories);
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

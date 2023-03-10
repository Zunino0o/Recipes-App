import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import Buttons from '../components/Buttons';
import LoginContext from '../context/LoginContext';
import { getRecipes, getRecipesCategories } from '../services/fetchAPI';
import Recipes from '../components/Recipes';

function Drinks() {
  const { setType, setRecipes, setBtnsCategory } = useContext(LoginContext);
  const getDrinks = async (type) => {
    // console.log(type);
    const drinkList = await getRecipes(type);
    const drinkCategories = await getRecipesCategories(type);
    setRecipes(drinkList);
    setBtnsCategory(drinkCategories);
    // console.log(drinkCategories);
  };

  useEffect(() => {
    setType('drinks');
    getDrinks('drinks');
  });
  return (
    <section>
      <Header pageTitle="Drinks" />
      {/* <Buttons /> */}
      <Recipes />
      <Footer />
    </section>
  );
}
export default Drinks;
